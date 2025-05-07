# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import numpy as np
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.preprocessing import OneHotEncoder, StandardScaler
# from sklearn.compose import ColumnTransformer
# from sklearn.pipeline import Pipeline
# import warnings
# import pickle
# import os
# import json

# # Suppress warnings
# warnings.filterwarnings('ignore')

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Define the path for the dataset and model files
# DATA_PATH = 'indian_startup_funding_synthetic.csv'
# MODEL_DIR = 'models'

# # Create models directory if it doesn't exist
# os.makedirs(MODEL_DIR, exist_ok=True)

# # Path for model files
# REVENUE_MODEL_PATH = os.path.join(MODEL_DIR, 'revenue_model.pkl')
# VALUATION_MODEL_PATH = os.path.join(MODEL_DIR, 'valuation_model.pkl')
# MARKET_SHARE_MODEL_PATH = os.path.join(MODEL_DIR, 'market_share_model.pkl')

# # Load and prepare the data
# def load_data():
#     print("Loading dataset...")
#     df = pd.read_csv(DATA_PATH)
    
#     # Define features
#     features = [
#         'industry', 'market_size_estimate', 'market_growth_rate',
#         'founder_experience_years', 'founder_previous_exits', 'founder_education_level',
#         'team_size', 'monthly_active_users', 'revenue_last_month',
#         'growth_rate_last_3_months', 'pilot_partnerships', 'funding_rounds',
#         'total_funding_received', 'investors_count'
#     ]
    
#     # Synthetic future targets function
#     def simulate_future(row, year):
#         # Basic growth factors
#         growth_factor = (1 + row['market_growth_rate'] / 100) * (1 + row['growth_rate_last_3_months'] / 100)

#         # Introduce RISK factor (synthetic)
#         risk_score = (
#             (5 - row['founder_experience_years'] / 10) +
#             (5 - row['funding_rounds']) +
#             (5 - row['pilot_partnerships'])
#         )

#         # Simulate negative impact if risk is high
#         if risk_score > 7:  # High risk startup
#             decline_factor = np.random.uniform(0.7, 0.95)  # Possible shrinkage
#         else:
#             decline_factor = 1

#         revenue = row['revenue_last_month'] * ((growth_factor * decline_factor) ** year)
#         valuation = row['total_funding_received'] * (1.5 + 0.1 * year) * ((growth_factor * decline_factor) ** (year / 2))
#         market_share = (revenue / (row['market_size_estimate'] * 1e6)) * 100

#         return revenue, valuation, market_share
    
#     # Expand dataset for Year 1 to 5
#     rows = []
#     for _, row in df.iterrows():
#         record = {'startup_name': row['startup_name']}
#         for year in range(1, 6):
#             revenue, valuation, market_share = simulate_future(row, year)
#             record[f'revenue_year_{year}'] = revenue
#             record[f'valuation_year_{year}'] = valuation
#             record[f'market_share_year_{year}'] = market_share
#         rows.append(record)

#     growth_df = pd.DataFrame(rows)

#     # Merge for modeling
#     full_df = pd.merge(df, growth_df, on='startup_name')
    
#     # Targets
#     target_cols_revenue = [f'revenue_year_{i}' for i in range(1, 6)]
#     target_cols_valuation = [f'valuation_year_{i}' for i in range(1, 6)]
#     target_cols_market_share = [f'market_share_year_{i}' for i in range(1, 6)]
    
#     return full_df, features, target_cols_revenue, target_cols_valuation, target_cols_market_share

# # Train or load models
# def get_models():
#     # Check if models exist
#     if (os.path.exists(REVENUE_MODEL_PATH) and 
#         os.path.exists(VALUATION_MODEL_PATH) and 
#         os.path.exists(MARKET_SHARE_MODEL_PATH)):
        
#         print("Loading existing models...")
#         with open(REVENUE_MODEL_PATH, 'rb') as f:
#             revenue_model = pickle.load(f)
#         with open(VALUATION_MODEL_PATH, 'rb') as f:
#             valuation_model = pickle.load(f)
#         with open(MARKET_SHARE_MODEL_PATH, 'rb') as f:
#             market_share_model = pickle.load(f)
#     else:
#         print("Training new models...")
#         full_df, features, target_cols_revenue, target_cols_valuation, target_cols_market_share = load_data()
        
#         # Define preprocessing pipeline
#         numeric_features = [
#             'market_size_estimate', 'market_growth_rate', 'founder_experience_years',
#             'founder_previous_exits', 'team_size', 'monthly_active_users',
#             'revenue_last_month', 'growth_rate_last_3_months', 'pilot_partnerships',
#             'funding_rounds', 'total_funding_received', 'investors_count'
#         ]
#         categorical_features = ['industry', 'founder_education_level']

#         preprocessor = ColumnTransformer(
#             transformers=[
#                 ('num', StandardScaler(), numeric_features),
#                 ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
#             ]
#         )

#         # Build model pipelines
#         revenue_model = Pipeline([
#             ('preprocessor', preprocessor),
#             ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
#         ])

#         valuation_model = Pipeline([
#             ('preprocessor', preprocessor),
#             ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
#         ])

#         market_share_model = Pipeline([
#             ('preprocessor', preprocessor),
#             ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
#         ])

#         # Train models
#         X = full_df[features]
#         y_revenue = full_df[target_cols_revenue]
#         y_valuation = full_df[target_cols_valuation]
#         y_market_share = full_df[target_cols_market_share]

#         print("Training revenue model...")
#         revenue_model.fit(X, y_revenue)
#         print("Training valuation model...")
#         valuation_model.fit(X, y_valuation)
#         print("Training market share model...")
#         market_share_model.fit(X, y_market_share)
        
#         # Save the models
#         with open(REVENUE_MODEL_PATH, 'wb') as f:
#             pickle.dump(revenue_model, f)
#         with open(VALUATION_MODEL_PATH, 'wb') as f:
#             pickle.dump(valuation_model, f)
#         with open(MARKET_SHARE_MODEL_PATH, 'wb') as f:
#             pickle.dump(market_share_model, f)
    
#     return revenue_model, valuation_model, market_share_model

# # API endpoint to get all startup names
# @app.route('/api/startups', methods=['GET'])
# def get_startups():
#     try:
#         df = pd.read_csv(DATA_PATH)
#         startups = df['startup_name'].tolist()
#         return jsonify({'status': 'success', 'startups': startups})
#     except Exception as e:
#         return jsonify({'status': 'error', 'message': str(e)}), 500

# # API endpoint to get growth predictions for a startup
# @app.route('/api/predict')
# def predict_growth():
#     startup_name = request.args.get('startup_name')
    
#     if not startup_name:
#         return jsonify({'status': 'error', 'message': 'Please provide a startup name'}), 400
    
#     try:
#         # Load data and models
#         full_df, features, _, _, _ = load_data()
#         revenue_model, valuation_model, market_share_model = get_models()
        
#         # Check if startup exists in the dataset
#         if startup_name not in full_df['startup_name'].values:
#             return jsonify({
#                 'status': 'error', 
#                 'message': f"Startup '{startup_name}' not found",
#                 'available_startups': full_df['startup_name'].tolist()
#             }), 404
        
#         # Get the startup's data
#         idx = full_df[full_df['startup_name'] == startup_name].index[0]
#         new_data = full_df.loc[[idx], features]
        
#         # Make predictions
#         pred_revenue = revenue_model.predict(new_data)[0]
#         pred_valuation = valuation_model.predict(new_data)[0]
#         pred_market_share = market_share_model.predict(new_data)[0]
        
#         # Convert to Python lists and format the data for frontend
#         years = list(range(1, 6))
        
#         # Convert to crores for revenue and valuation (1 crore = 10^7)
#         revenue_data = [float(val / 1e7) for val in pred_revenue]
#         valuation_data = [float(val / 1e7) for val in pred_valuation]
#         market_share_data = [float(val) for val in pred_market_share]
        
#         # Get startup details for the context
#         startup_details = full_df.loc[idx, [
#             'industry', 'market_size_estimate', 'market_growth_rate',
#             'founder_experience_years', 'total_funding_received', 'revenue_last_month'
#         ]].to_dict()
        
#         # Format large numbers for better readability
#         startup_details['market_size_estimate'] = float(startup_details['market_size_estimate'])
#         startup_details['total_funding_received'] = float(startup_details['total_funding_received'])
#         startup_details['revenue_last_month'] = float(startup_details['revenue_last_month'])
        
#         response_data = {
#             'status': 'success',
#             'startup_name': startup_name,
#             'startup_details': startup_details,
#             'years': years,
#             'revenue': {
#                 'label': 'Projected Revenue (INR Crores)',
#                 'data': revenue_data
#             },
#             'valuation': {
#                 'label': 'Projected Valuation (INR Crores)',
#                 'data': valuation_data
#             },
#             'market_share': {
#                 'label': 'Projected Market Share (%)',
#                 'data': market_share_data
#             }
#         }
        
#         return jsonify(response_data)
    
#     except Exception as e:
#         import traceback
#         print(traceback.format_exc())
#         return jsonify({'status': 'error', 'message': str(e)}), 500

# # Health check endpoint
# @app.route('/health', methods=['GET'])
# def health_check():
#     return jsonify({'status': 'API is running'})

# if __name__== '__main__':
#     print("Starting Flask API server...")
#     # Load data and train models on startup
#     get_models()
#     # Run the Flask app
#     app.run(host='0.0.0.0', port=5000, debug=True)



from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import warnings
import os
import json

# Suppress warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define the path for the dataset
DATA_PATH = 'indian_startup_funding_synthetic.csv'

# Global variables to store models
revenue_model = None
valuation_model = None
market_share_model = None
features = None
categorical_features = None
numeric_features = None

# Load and prepare the data
def load_data():
    print("Loading dataset...")
    df = pd.read_csv(DATA_PATH)
    
    # Define features
    features = [
        'industry', 'market_size_estimate', 'market_growth_rate',
        'founder_experience_years', 'founder_previous_exits', 'founder_education_level',
        'team_size', 'monthly_active_users', 'revenue_last_month',
        'growth_rate_last_3_months', 'pilot_partnerships', 'funding_rounds',
        'total_funding_received', 'investors_count'
    ]
    
    # Synthetic future targets function
    def simulate_future(row, year):
        # Basic growth factors
        growth_factor = (1 + row['market_growth_rate'] / 100) * (1 + row['growth_rate_last_3_months'] / 100)

        # Introduce RISK factor (synthetic)
        risk_score = (
            (5 - row['founder_experience_years'] / 10) +
            (5 - row['funding_rounds']) +
            (5 - row['pilot_partnerships'])
        )

        # Simulate negative impact if risk is high
        if risk_score > 7:  # High risk startup
            decline_factor = np.random.uniform(0.7, 0.95)  # Possible shrinkage
        else:
            decline_factor = 1

        revenue = row['revenue_last_month'] * ((growth_factor * decline_factor) ** year)
        valuation = row['total_funding_received'] * (1.5 + 0.1 * year) * ((growth_factor * decline_factor) ** (year / 2))
        market_share = (revenue / (row['market_size_estimate'] * 1e6)) * 100

        return revenue, valuation, market_share
    
    # Expand dataset for Year 1 to 5
    rows = []
    for _, row in df.iterrows():
        record = {'startup_name': row['startup_name']}
        for year in range(1, 6):
            revenue, valuation, market_share = simulate_future(row, year)
            record[f'revenue_year_{year}'] = revenue
            record[f'valuation_year_{year}'] = valuation
            record[f'market_share_year_{year}'] = market_share
        rows.append(record)

    growth_df = pd.DataFrame(rows)

    # Merge for modeling
    full_df = pd.merge(df, growth_df, on='startup_name')
    
    # Targets
    target_cols_revenue = [f'revenue_year_{i}' for i in range(1, 6)]
    target_cols_valuation = [f'valuation_year_{i}' for i in range(1, 6)]
    target_cols_market_share = [f'market_share_year_{i}' for i in range(1, 6)]
    
    return full_df, features, target_cols_revenue, target_cols_valuation, target_cols_market_share

# Train models
def train_models():
    global revenue_model, valuation_model, market_share_model, features, categorical_features, numeric_features
    
    print("Training new models...")
    full_df, features, target_cols_revenue, target_cols_valuation, target_cols_market_share = load_data()
    
    # Define preprocessing pipeline
    numeric_features = [
        'market_size_estimate', 'market_growth_rate', 'founder_experience_years',
        'founder_previous_exits', 'team_size', 'monthly_active_users',
        'revenue_last_month', 'growth_rate_last_3_months', 'pilot_partnerships',
        'funding_rounds', 'total_funding_received', 'investors_count'
    ]
    categorical_features = ['industry', 'founder_education_level']

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numeric_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ]
    )

    # Build model pipelines
    revenue_model = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
    ])

    valuation_model = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
    ])

    market_share_model = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
    ])

    # Train models
    X = full_df[features]
    y_revenue = full_df[target_cols_revenue]
    y_valuation = full_df[target_cols_valuation]
    y_market_share = full_df[target_cols_market_share]

    print("Training revenue model...")
    revenue_model.fit(X, y_revenue)
    print("Training valuation model...")
    valuation_model.fit(X, y_valuation)
    print("Training market share model...")
    market_share_model.fit(X, y_market_share)
    
    return revenue_model, valuation_model, market_share_model, features, categorical_features, numeric_features

# API endpoint to get all startup names (for reference)
@app.route('/api/startups', methods=['GET'])
def get_startups():
    try:
        df = pd.read_csv(DATA_PATH)
        startups = df['startup_name'].tolist()
        return jsonify({'status': 'success', 'startups': startups})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# API endpoint to get feature list and their data types
@app.route('/api/features', methods=['GET'])
def get_features():
    global features, categorical_features, numeric_features
    
    if not features:
        train_models()
    
    feature_info = {
        'all_features': features,
        'categorical_features': categorical_features,
        'numeric_features': numeric_features
    }
    
    return jsonify({'status': 'success', 'features': feature_info})

# API endpoint to predict growth based on input data
@app.route('/api/predict', methods=['POST'])
def predict_growth():
    print('hi')
    global revenue_model, valuation_model, market_share_model, features
    
    # Check if we have trained models, if not train them
    if revenue_model is None or valuation_model is None or market_share_model is None:
        train_models()
    
    try:
        # Get data from request
        input_data = request.json
        print(input_data)
        if not input_data:
            return jsonify({'status': 'error', 'message': 'Please provide startup data'}), 400
        #input_data.pilot_partnerships = input_data.pilot_partneships ? "TRUE" | "FALSE",
        # Create a DataFrame from input data
        new_data = pd.DataFrame([input_data])
        
        # Check if all required features are present
        missing_features = [f for f in features if f not in new_data.columns]
        if missing_features:
            return jsonify({
                'status': 'error',
                'message': f'Missing required features: {missing_features}',
                'required_features': features
            }), 400
        
        # Make predictions
        pred_revenue = revenue_model.predict(new_data[features])[0]
        pred_valuation = valuation_model.predict(new_data[features])[0]
        pred_market_share = market_share_model.predict(new_data[features])[0]
        
        # Convert to Python lists and format the data for frontend
        years = list(range(1, 6))
        
        # Convert to crores for revenue and valuation (1 crore = 10^7)
        revenue_data = [float(val / 1e7) for val in pred_revenue]
        valuation_data = [float(val / 1e7) for val in pred_valuation]
        market_share_data = [float(val) for val in pred_market_share]
        
        # Get startup details for the context
        startup_details = {
            'industry': input_data.get('industry', 'N/A'),
            'market_size_estimate': float(input_data.get('market_size_estimate', 0)),
            'market_growth_rate': float(input_data.get('market_growth_rate', 0)),
            'founder_experience_years': float(input_data.get('founder_experience_years', 0)),
            'total_funding_received': float(input_data.get('total_funding_received', 0)),
            'revenue_last_month': float(input_data.get('revenue_last_month', 0))
        }
        
        response_data = {
            'status': 'success',
            'startup_name': input_data.get('startup_name', 'New Startup'),
            'startup_details': startup_details,
            'years': years,
            'revenue': {
                'label': 'Projected Revenue (INR Crores)',
                'data': revenue_data
            },
            'valuation': {
                'label': 'Projected Valuation (INR Crores)',
                'data': valuation_data
            },
            'market_share': {
                'label': 'Projected Market Share (%)',
                'data': market_share_data
            }
        }
        
        return jsonify(response_data)
    
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'API is running'})

if __name__== '__main__':
    print("Starting Flask API server...")
    # Train models on startup
    train_models()
    # Run the Flask app
    app.run(host='0.0.0.0', port=5001, debug=True)