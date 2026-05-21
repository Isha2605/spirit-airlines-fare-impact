# Spirit Airlines Shutdown: Fare Impact Analysis

An end-to-end data analysis of how airfares changed on Spirit Airlines' 20 busiest US routes after the carrier ceased operations on **May 2, 2026**.

---

## The Question

> How much did ticket prices rise when Spirit — America's largest ultra-low-cost carrier — shut down?

---

## Key Findings

- Analyzed **20 routes** that Spirit operated before shutdown
- Compared **BTS Q1/Q2 2025 historical fares** against **May 2026 live Google Flights prices**
- **Frontier Airlines** emerged as the primary successor on most Spirit routes
- Several routes saw fare increases of **30%+** after Spirit's exit

---

## Data Sources

| Source | Description | Period |
|--------|-------------|--------|
| [BTS DB1B Market Survey](https://www.transtats.bts.gov/) | Ticket price microdata (Spirit/NK only) | Q1–Q2 2025 |
| Google Flights (manual scrape) | Current lowest fares on 20 routes | May 8, 2026 |

---

## The 20 Routes Analyzed

```
FLL→LGA  FLL→ORD  FLL→ATL  FLL→DFW  FLL→LAX
MCO→LGA  MCO→ORD  MCO→BWI
LAS→DFW  LAS→LAX  LAS→ATL  LAS→IAH
IAH→FLL  IAH→MCO
DTW→FLL  DTW→MCO
BWI→FLL  PHL→MCO  ATL→FLL  ORD→FLL
```

---

## Project Structure

```
spirit-airlines-fare-impact/
├── data/
│   └── processed/              # Cleaned CSVs ready for analysis
│       ├── spirit_20routes_clean.csv       # BTS Q1 2025 Spirit fares
│       ├── spirit_20routes_clean_q2.csv    # BTS Q2 2025 Spirit fares
│       ├── google_flights_fares.csv        # May 2026 live fares
│       ├── fare_impact_analysis.csv        # Route-level % change
│       ├── carrier_analysis.csv            # Post-Spirit carrier breakdown
│       └── kpi_summary.csv                 # Summary KPIs
├── notebooks/
│   ├── 03_analysis.ipynb           # Main analysis notebook
│   └── 03_analysis_executed.ipynb  # Executed version with outputs
├── dashboard.html                  # Interactive Plotly dashboard
├── requirements.txt
└── README.md
```

---

## How to Run

```bash
# 1. Clone the repo
git clone https://github.com/isha2605/spirit-airlines-fare-impact.git
cd spirit-airlines-fare-impact

# 2. Install dependencies
pip install -r requirements.txt

# 3. Open the analysis notebook
jupyter notebook notebooks/03_analysis.ipynb

# 4. View the dashboard
# Open dashboard.html in any browser
```

---

## Tools Used

- **Python** — pandas, numpy, matplotlib, seaborn
- **Jupyter Notebook** — analysis and visualization
- **Plotly** — interactive dashboard charts
- **Data: BTS** — Bureau of Transportation Statistics

---

## Author

Built as a data analytics case study to quantify the consumer impact of airline consolidation.
