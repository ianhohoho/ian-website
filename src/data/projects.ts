import { Project } from "@/components/project-card";

export const projects: Project[] = [
  {
    title: "Customer Churn Prediction",
    description:
      "Built a machine learning pipeline to predict customer churn using gradient boosting, achieving 92% AUC. Deployed as a REST API with FastAPI.",
    techStack: ["Python", "Scikit-learn", "FastAPI", "Docker"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "NLP Sentiment Analyzer",
    description:
      "Fine-tuned a transformer model for multi-class sentiment analysis on product reviews. Built an interactive dashboard for exploring results.",
    techStack: ["PyTorch", "Hugging Face", "Streamlit", "PostgreSQL"],
    githubUrl: "https://github.com",
  },
  {
    title: "Time Series Forecasting Dashboard",
    description:
      "Developed an interactive forecasting tool for sales data using Prophet and ARIMA models with automated hyperparameter tuning.",
    techStack: ["Python", "Prophet", "Plotly", "Pandas"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Data Pipeline Orchestrator",
    description:
      "Designed and implemented an ETL pipeline processing 10M+ records daily with monitoring, alerting, and automatic retry logic.",
    techStack: ["Airflow", "Python", "AWS S3", "Snowflake"],
    githubUrl: "https://github.com",
  },
];
