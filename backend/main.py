from fastapi import FastAPI, Query
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React frontend (CORS settings)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CSV files only once at startup
AWS_DF = pd.read_csv("aws_line_items_12mo.csv").rename(columns={"account_id": "id"})
GCP_DF = pd.read_csv("gcp_billing_12mo.csv").rename(columns={"project_id": "id"})

AWS_DF["cloud_provider"] = "aws"
GCP_DF["cloud_provider"] = "gcp"

MERGED_DF = pd.concat([AWS_DF, GCP_DF], ignore_index=True).replace({float("nan"): None})  # appended rows

@app.get("/data")
def get_data(
    cloud_provider: list[str] = Query(default=["all"]),
    team: list[str] = Query(default=["all"]),
    env: list[str] = Query(default=["all"]),
    page: int = 1,
    limit: int = 50,
    sort_by: str = None,
    order: str = "asc"
):

    df = MERGED_DF.copy()

    # Cloud provider filter
    if "all" not in [x.lower() for x in cloud_provider]:
        df = df[df["cloud_provider"].str.lower().isin([x.lower() for x in cloud_provider])]

    # Team filter
    if "all" not in [x.lower() for x in team]:
        df = df[df["team"].str.lower().isin([x.lower() for x in team])]

    # Environment filter
    if "all" not in [x.lower() for x in env]:
        df = df[df["env"].str.lower().isin([x.lower() for x in env])]

    # Sorting
    if sort_by and sort_by in df.columns:
        ascending = True if order.lower() == "asc" else False
        df = df.sort_values(by=sort_by, ascending=ascending)

    # Pagination
    total_rows = len(df)
    total_pages = (total_rows + limit - 1) // limit
    start = (page - 1) * limit
    end = start + limit

    rows = df.iloc[start:end].to_dict(orient="records")
    
     # Calculate total spend
    total_spend = df["cost_usd"].sum()

    # Calculate spend by cloud provider
    spend_by_provider = df.groupby("cloud_provider")["cost_usd"].sum().to_dict()

    # Calculate spend by team
    spend_by_team = df.groupby("team")["cost_usd"].sum().to_dict()
    
   # Ensure 'date' is datetime
    df['date'] = pd.to_datetime(df['date'])

    # Group by month and sum costs
    monthly_spend = (
        df.groupby(df['date'].dt.to_period('M'))['cost_usd']
        .sum()
        .astype(float)
    )

    # Convert to list of tuples and sort
    monthly_spend = sorted(monthly_spend.items())  # [(Period('2025-01', 'M'), 61979.95), ...]

    # Convert to JSON-serializable list of dicts
    monthly_spend_json = [
        {"month": str(period), "spend": float(spend)}
        for period, spend in monthly_spend
    ]
    
    return {
        "page": page,
        "limit": limit,
        "total_rows": total_rows,
        "total_pages": total_pages,
        "data": rows,
        "summary" : {  
            "total_spend": total_spend,
            "spend_by_provider": spend_by_provider,
            "spend_by_team" : spend_by_team,
            "monthly_spend" : monthly_spend_json
        }
    }
    
