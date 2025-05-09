# 🚀 VentureWise — Smart Crowdfunding Platform for Startups & Investors

VentureWise is an intelligent crowdfunding platform that bridges the gap between promising startups and forward-thinking investors. It leverages data-driven risk assessment, machine learning-based growth forecasting, and an intuitive investment workflow to streamline funding decisions.

## 📌 Key Features

### 🧠 AI-Powered Startup Risk Assessment
- Uses KMeans clustering to group startups into Low, Medium, and High risk based on key attributes (revenue, team size, funding history, etc.).
- Assigns a “Risk Label” to help investors evaluate investment feasibility.

### 📈 5-Year Growth Prediction Model
- Predicts revenue, valuation, and market share over 5 years using a Random Forest Regressor.
- Simulates future performance based on current growth rates, market size, and founder metrics.
- Visualizes growth curves through matplotlib.

### 💼 Investor Investment Flow
- Investors can view individual startup pages.
- Investment form at /app/investor/startup/[id]/invest allows seamless interaction.
- Smart validation logic for investment amounts and transaction hash given of every investment made.

### 🔐 Authentication
- Passwordless login using MetaMask wallet (browser extension).
- Users authenticate by signing a message with their Ethereum wallet, ensuring secure, decentralized access.
- Role-based access control (Investor vs Startup) is implemented after wallet verification.

## 🧪 Tech Stack
* Frontend: Next.js, TailwindCSS, ShadCN UI
* Backend: Express.js, MongoDB
* AI Integration: Flask (via Render.com hosted APIs)
* Auth: MetaMask Wallet (passwordless login), Role-based access *[Check out Metamask here](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)*

## 🧪 ML Models Used

### 1. Clustering Risk Model (Unsupervised)
- Preprocessing: Label Encoding + Standard Scaling
- Clustering: KMeans (n=3)
- Output: Cluster label → Risk label (Low, Moderate, High)

### 2. Growth Prediction Models (Supervised)
- Targets: Revenue, Valuation, Market Share (5 years)
- Model: RandomForestRegressor
- Input Features: Industry, Market Size, Team Size, Revenue, Growth Rate, etc.


## 🔄 API Endpoints

| Method | Endpoint                   | Description                                                          |
| ------ | -------------------------- | -------------------------------------------------------------------- |
| GET    | /api/investor              | List all active startups for the investor dashboard                  |
| GET    | /api/investor/\[id]        | Get detailed information about a specific startup                    |
| GET    | /api/investor/portfolio    | Get all investments made by the investor                             |
| POST   | /api/startup/\[id]/invest  | Handle investment action made by an investor on a particular startup |
| POST   | /api/startup/create        | Create a new startup listing                                         |
| GET    | /api/startup/dashboard     | Get all startups owned by the logged-in startup user                 |
| PUT    | /api/startup/edit          | Edit startup information                                             |
| POST   | /api/predict               | Call ML model for Risk Assessment and Growth Prediction              |


## 👥 Contributors

- *[Meet Mistry](https://github.com/meetmistry27)* - Developer
- *[Smit Bhansali](https://github.com/Smituz/)* - Developer
