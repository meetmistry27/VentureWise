# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # import pandas as pd
# # import numpy as np
# # import pickle
# # import os
# # from sklearn.preprocessing import LabelEncoder, StandardScaler
# # from sklearn.cluster import KMeans

# # app = Flask(__name__)
# # CORS(app, resources={r"/*": {"origins": "http://localhost:3001" }}, supports_credentials=True)


# # # Path to store model files
# # MODEL_DIR = 'model'
# # os.makedirs(MODEL_DIR, exist_ok=True)

# # # Function to train and save the model
# # def train_and_save_model():
# #     # Load dataset
# #     df = pd.read_csv("C:/Users/HP/OneDrive/Desktop/VentureWise-master/indian_startup_funding_synthetic.csv")
    
# #     # Drop Leaky or Post-Funding Columns
# #     df = df.drop(columns=[
# #         'startup_id', 'startup_name', 'status', 'total_funding_received',
# #         'funding_rounds', 'pitch_deck_summary', 'vision_statement',
# #         'problem_statement'
# #     ])
    
# #     # Get feature columns
# #     feature_columns = df.columns.tolist()
    
# #     # Encode Categorical Features
# #     label_encoders = {}
# #     categorical_cols = df.select_dtypes(include=['object']).columns
    
# #     for col in categorical_cols:
# #         le = LabelEncoder()
# #         df[col] = le.fit_transform(df[col].astype(str))
# #         label_encoders[col] = le
    
# #     # Feature Scaling
# #     scaler = StandardScaler()
# #     scaled_features = scaler.fit_transform(df)
    
# #     # Apply KMeans Clustering
# #     kmeans = KMeans(n_clusters=3, random_state=42)
# #     kmeans.fit(scaled_features)
    
# #     # Save model components
# #     with open(os.path.join(MODEL_DIR, 'label_encoders.pkl'), 'wb') as f:
# #         pickle.dump(label_encoders, f)
    
# #     with open(os.path.join(MODEL_DIR, 'scaler.pkl'), 'wb') as f:
# #         pickle.dump(scaler, f)
    
# #     with open(os.path.join(MODEL_DIR, 'kmeans.pkl'), 'wb') as f:
# #         pickle.dump(kmeans, f)
    
# #     with open(os.path.join(MODEL_DIR, 'feature_columns.pkl'), 'wb') as f:
# #         pickle.dump(feature_columns, f)
    
# #     print("Model trained and saved successfully!")

# # # Function to assign risk label based on cluster
# # def assign_risk_label(cluster):
# #     if cluster == 0:
# #         return 'Low Risk'
# #     elif cluster == 1:
# #         return 'Moderate Risk'
# #     elif cluster == 2:
# #         return 'High Risk'

# # # Load the model if it exists, otherwise train it
# # def load_model():
# #     try:
# #         with open(os.path.join(MODEL_DIR, 'label_encoders.pkl'), 'rb') as f:
# #             label_encoders = pickle.load(f)
        
# #         with open(os.path.join(MODEL_DIR, 'scaler.pkl'), 'rb') as f:
# #             scaler = pickle.load(f)
        
# #         with open(os.path.join(MODEL_DIR, 'kmeans.pkl'), 'rb') as f:
# #             kmeans = pickle.load(f)
        
# #         with open(os.path.join(MODEL_DIR, 'feature_columns.pkl'), 'rb') as f:
# #             feature_columns = pickle.load(f)
        
# #         return label_encoders, scaler, kmeans, feature_columns
    
# #     except FileNotFoundError:
# #         print("Model files not found. Training a new model...")
# #         train_and_save_model()
# #         return load_model()

# # @app.route('/predict', methods=['POST'])
# # def predict():
# #     print("hi iam meet")
# #     try:
# #         # Get data from request
# #         data = request.json
        
# #         # Check if data is provided
# #         if not data:
# #             return jsonify({"error": "No data provided"}), 400
        
# #         # Load model components
# #         label_encoders, scaler, kmeans, feature_columns = load_model()
        
# #         # Convert input data to DataFrame
# #         input_df = pd.DataFrame([data])
        
# #         # Ensure all expected columns are present
# #         for col in feature_columns:
# #             if col not in input_df.columns:
# #                 input_df[col] = np.nan  # Fill missing columns with NaN
        
# #         # Reorder columns to match training data
# #         input_df = input_df[feature_columns]
        
# #         # Encode categorical features
# #         for col in input_df.columns:
# #             if col in label_encoders:
# #                 # Handle unknown categories gracefully
# #                 try:
# #                     input_df[col] = label_encoders[col].transform(input_df[col].astype(str))
# #                 except ValueError:
# #                     # For unknown categories, use the most frequent category from training
# #                     most_frequent_code = np.argmax(np.bincount(label_encoders[col].transform(label_encoders[col].classes_)))
# #                     input_df[col] = most_frequent_code
        
# #         # Scale features
# #         scaled_input = scaler.transform(input_df)
        
# #         # Predict cluster
# #         cluster = kmeans.predict(scaled_input)[0]
        
# #         # Assign risk label
# #         risk_label = assign_risk_label(cluster)
        
# #         # Calculate confidence score (distance to cluster center)
# #         distances = kmeans.transform(scaled_input)[0]
# #         confidence = 1 - (distances[cluster] / (np.sum(distances) + 1e-10))  # Normalized confidence
        
# #         return jsonify({
# #             "cluster": int(cluster),
# #             "risk_label": risk_label,
# #             "confidence": float(confidence)
# #         })
    
# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500

# # @app.route('/health', methods=['GET'])
# # def health_check():
# #     return jsonify({"status": "healthy"}), 200

# # if __name__ == '__main__':
# #     # Train the model on first run
# #     # if not os.path.exists(os.path.join(MODEL_DIR, 'kmeans.pkl')):
# #     #     train_and_save_model()
    
# #     # Run the Flask app
# #     app.run(debug=True, port=5000)

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import numpy as np
# import pickle
# import os
# from sklearn.preprocessing import LabelEncoder, StandardScaler
# from sklearn.cluster import KMeans

# app = Flask(__name__)
# # Update CORS configuration to allow requests from all origins during development
# CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


# # Path to store model files
# MODEL_DIR = 'model'
# os.makedirs(MODEL_DIR, exist_ok=True)

# # Function to train and save the model
# def train_and_save_model():
#     # Load dataset
#     df = pd.read_csv("C:/Users/HP/OneDrive/Desktop/VentureWise-master/indian_startup_funding_synthetic.csv")
    
#     # Drop Leaky or Post-Funding Columns
#     df = df.drop(columns=[
#         'startup_id', 'startup_name', 'status', 'total_funding_received',
#         'funding_rounds', 'pitch_deck_summary', 'vision_statement',
#         'problem_statement'
#     ])
    
#     # Get feature columns
#     feature_columns = df.columns.tolist()
    
#     # Encode Categorical Features
#     label_encoders = {}
#     categorical_cols = df.select_dtypes(include=['object']).columns
    
#     for col in categorical_cols:
#         le = LabelEncoder()
#         df[col] = le.fit_transform(df[col].astype(str))
#         label_encoders[col] = le
    
#     # Feature Scaling
#     scaler = StandardScaler()
#     scaled_features = scaler.fit_transform(df)
    
#     # Apply KMeans Clustering
#     kmeans = KMeans(n_clusters=3, random_state=42)
#     kmeans.fit(scaled_features)
    
#     # Save model components
#     with open(os.path.join(MODEL_DIR, 'label_encoders.pkl'), 'wb') as f:
#         pickle.dump(label_encoders, f)
    
#     with open(os.path.join(MODEL_DIR, 'scaler.pkl'), 'wb') as f:
#         pickle.dump(scaler, f)
    
#     with open(os.path.join(MODEL_DIR, 'kmeans.pkl'), 'wb') as f:
#         pickle.dump(kmeans, f)
    
#     with open(os.path.join(MODEL_DIR, 'feature_columns.pkl'), 'wb') as f:
#         pickle.dump(feature_columns, f)
    
#     print("Model trained and saved successfully!")

# # Function to assign risk label based on cluster
# def assign_risk_label(cluster):
#     if cluster == 0:
#         return 'Low Risk'
#     elif cluster == 1:
#         return 'Moderate Risk'
#     elif cluster == 2:
#         return 'High Risk'

# # Load the model if it exists, otherwise train it
# def load_model():
#     try:
#         with open(os.path.join(MODEL_DIR, 'label_encoders.pkl'), 'rb') as f:
#             label_encoders = pickle.load(f)
        
#         with open(os.path.join(MODEL_DIR, 'scaler.pkl'), 'rb') as f:
#             scaler = pickle.load(f)
        
#         with open(os.path.join(MODEL_DIR, 'kmeans.pkl'), 'rb') as f:
#             kmeans = pickle.load(f)
        
#         with open(os.path.join(MODEL_DIR, 'feature_columns.pkl'), 'rb') as f:
#             feature_columns = pickle.load(f)
        
#         return label_encoders, scaler, kmeans, feature_columns
    
#     except FileNotFoundError:
#         print("Model files not found. Training a new model...")
#         train_and_save_model()
#         return load_model()

# @app.route('/predict', methods=['POST', 'OPTIONS'])
# def predict():
#     # Handle preflight CORS requests
#     if request.method == 'OPTIONS':
#         return '', 200
        
#     try:
#         # Get data from request
#         data = request.json
        
#         # Check if data is provided
#         if not data:
#             return jsonify({"error": "No data provided"}), 400
        
#         # Load model components
#         label_encoders, scaler, kmeans, feature_columns = load_model()
        
#         # Convert input data to DataFrame
#         input_df = pd.DataFrame([data])
        
#         # Ensure all expected columns are present
#         for col in feature_columns:
#             if col not in input_df.columns:
#                 input_df[col] = np.nan  # Fill missing columns with NaN
        
#         # Reorder columns to match training data
#         input_df = input_df[feature_columns]
        
#         # Encode categorical features
#         for col in input_df.columns:
#             if col in label_encoders:
#                 # Handle unknown categories gracefully
#                 try:
#                     input_df[col] = label_encoders[col].transform(input_df[col].astype(str))
#                 except ValueError:
#                     # For unknown categories, use the most frequent category from training
#                     most_frequent_code = np.argmax(np.bincount(label_encoders[col].transform(label_encoders[col].classes_)))
#                     input_df[col] = most_frequent_code
        
#         # Scale features
#         scaled_input = scaler.transform(input_df)
        
#         # Predict cluster
#         cluster = kmeans.predict(scaled_input)[0]
        
#         # Assign risk label
#         risk_label = assign_risk_label(cluster)
        
#         # Calculate confidence score (distance to cluster center)
#         distances = kmeans.transform(scaled_input)[0]
#         confidence = 1 - (distances[cluster] / (np.sum(distances) + 1e-10))  # Normalized confidence
        
#         # Convert numpy types to Python native types for JSON serialization
#         response_data = {
#             "cluster": int(cluster),
#             "risk_label": risk_label,
#             "confidence": float(confidence),
#             "score": int(confidence * 100)  # Adding a score field for the frontend
#         }
        
#         return jsonify(response_data)
    
#     except Exception as e:
#         print(f"Error during prediction: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# @app.route('/health', methods=['GET'])
# def health_check():
#     return jsonify({"status": "healthy"}), 200

# if __name__ == '__main__':
#     # Run the Flask app
#     app.run(debug=True, port=5000)


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import numpy as np
# import pickle
# import os
# from sklearn.preprocessing import LabelEncoder, StandardScaler
# from sklearn.cluster import KMeans

# app = Flask(__name__)
# # Update CORS configuration to allow requests from all origins during development
# CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


# # Path to store model files
# MODEL_DIR = 'model'
# os.makedirs(MODEL_DIR, exist_ok=True)

# # Function to train and save the model
# def train_and_save_model():
#     # Load dataset
#     df = pd.read_csv("C:/Users/HP/OneDrive/Desktop/VentureWise-master/indian_startup_funding_synthetic.csv")
    
#     # Drop Leaky or Post-Funding Columns
#     df = df.drop(columns=[
#         'startup_id', 'startup_name', 'status', 'total_funding_received',
#         'funding_rounds', 'pitch_deck_summary', 'vision_statement',
#         'problem_statement'
#     ])
    
#     # Get feature columns
#     feature_columns = df.columns.tolist()
    
#     # Encode Categorical Features
#     label_encoders = {}
#     categorical_cols = df.select_dtypes(include=['object']).columns
    
#     for col in categorical_cols:
#         le = LabelEncoder()
#         df[col] = le.fit_transform(df[col].astype(str))
#         label_encoders[col] = le
    
#     # Feature Scaling
#     scaler = StandardScaler()
#     scaled_features = scaler.fit_transform(df)
    
#     # Apply KMeans Clustering
#     kmeans = KMeans(n_clusters=3, random_state=42)
#     kmeans.fit(scaled_features)
    
#     # Save model components
#     with open(os.path.join(MODEL_DIR, 'label_encoders.pkl'), 'wb') as f:
#         pickle.dump(label_encoders, f)
    
#     with open(os.path.join(MODEL_DIR, 'scaler.pkl'), 'wb') as f:
#         pickle.dump(scaler, f)
    
#     with open(os.path.join(MODEL_DIR, 'kmeans.pkl'), 'wb') as f:
#         pickle.dump(kmeans, f)
    
#     with open(os.path.join(MODEL_DIR, 'feature_columns.pkl'), 'wb') as f:
#         pickle.dump(feature_columns, f)
    
#     print("Model trained and saved successfully!")

# # Function to assign risk label based on cluster
# def assign_risk_label(cluster):
#     if cluster == 0:
#         return 'Low Risk'
#     elif cluster == 1:
#         return 'Moderate Risk'
#     elif cluster == 2:
#         return 'High Risk'

# # Load the model if it exists, otherwise train it
# def load_model():
#     try:
#         with open(os.path.join(MODEL_DIR, 'label_encoders.pkl'), 'rb') as f:
#             label_encoders = pickle.load(f)
        
#         with open(os.path.join(MODEL_DIR, 'scaler.pkl'), 'rb') as f:
#             scaler = pickle.load(f)
        
#         with open(os.path.join(MODEL_DIR, 'kmeans.pkl'), 'rb') as f:
#             kmeans = pickle.load(f)
        
#         with open(os.path.join(MODEL_DIR, 'feature_columns.pkl'), 'rb') as f:
#             feature_columns = pickle.load(f)
        
#         return label_encoders, scaler, kmeans, feature_columns
    
#     except FileNotFoundError:
#         print("Model files not found. Training a new model...")
#         train_and_save_model()
#         return load_model()

# @app.route('/predict', methods=['POST', 'OPTIONS'])
# def predict():
#     # Handle preflight CORS requests
#     if request.method == 'OPTIONS':
#         return '', 200
        
#     try:
#         # Get data from request
#         data = request.json
#         print("Received data:", data)  # Debug print
        
#         # Check if data is provided
#         if not data:
#             return jsonify({"error": "No data provided"}), 400
        
#         # Load model components
#         label_encoders, scaler, kmeans, feature_columns = load_model()
        
#         # Convert input data to DataFrame
#         input_df = pd.DataFrame([data])
        
#         # Ensure all expected columns are present
#         for col in feature_columns:
#             if col not in input_df.columns:
#                 # Use 0 instead of NaN for better compatibility
#                 input_df[col] = 0
                
#         # Replace any NaN values with 0 to avoid scaling issues
#         input_df = input_df.fillna(0)
        
#         # Reorder columns to match training data
#         input_df = input_df[feature_columns]
        
#         # Encode categorical features
#         for col in input_df.columns:
#             if col in label_encoders:
#                 # Handle unknown categories and boolean values gracefully
#                 if col == 'pilot_partnerships' and isinstance(input_df[col].iloc[0], bool):
#                     # Convert boolean to 0/1 for the model
#                     input_df[col] = input_df[col].astype(int)
#                 else:
#                     try:
#                         input_df[col] = label_encoders[col].transform(input_df[col].astype(str))
#                     except ValueError:
#                         # For unknown categories, use the most frequent category from training
#                         most_frequent_code = np.argmax(np.bincount(label_encoders[col].transform(label_encoders[col].classes_)))
#                         input_df[col] = most_frequent_code
        
#         # Scale features
#         scaled_input = scaler.transform(input_df)
        
#         # Predict cluster
#         cluster = kmeans.predict(scaled_input)[0]
        
#         # Assign risk label
#         risk_label = assign_risk_label(cluster)
        
#         # Calculate confidence score (distance to cluster center)
#         distances = kmeans.transform(scaled_input)[0]
#         confidence = 1 - (distances[cluster] / (np.sum(distances) + 1e-10))  # Normalized confidence
        
#         # Convert numpy types to Python native types for JSON serialization
#         response_data = {
#             "cluster": int(cluster),
#             "risk_label": risk_label,
#             "confidence": float(confidence),
#             "score": int(confidence * 100)  # Adding a score field for the frontend
#         }
        
#         return jsonify(response_data)
    
#     except Exception as e:
#         print(f"Error during prediction: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# @app.route('/health', methods=['GET'])
# def health_check():
#     return jsonify({"status": "healthy"}), 200

# if __name__ == '__main__':
#     # Run the Flask app
#     app.run(debug=True, port=5000)


from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle
import os
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.cluster import KMeans

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

MODEL_DIR = 'model'
os.makedirs(MODEL_DIR, exist_ok=True)

MODEL_FILE = os.path.join(MODEL_DIR, 'startup_risk_model.pkl')

# Function to train and save the model
def train_and_save_model():
    df = pd.read_csv("C:/Users/HP/OneDrive/Desktop/VentureWise-master/indian_startup_funding_synthetic.csv")
    
    # Drop leaky or post-funding columns
    df = df.drop(columns=[
        'startup_id', 'startup_name', 'status', 'total_funding_received',
        'funding_rounds', 'pitch_deck_summary', 'vision_statement',
        'problem_statement'
    ])
    
    feature_columns = df.columns.tolist()
    
    # Encode categorical features
    label_encoders = {}
    categorical_cols = df.select_dtypes(include=['object']).columns
    
    for col in categorical_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        label_encoders[col] = le
    
    # Feature scaling
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(df)
    
    # Apply KMeans clustering
    kmeans = KMeans(n_clusters=3, random_state=42)
    kmeans.fit(scaled_features)
    
    # Bundle all components into one object
    model_bundle = {
        'label_encoders': label_encoders,
        'scaler': scaler,
        'kmeans': kmeans,
        'feature_columns': feature_columns
    }
    
    # Save to a single pickle file
    with open(MODEL_FILE, 'wb') as f:
        pickle.dump(model_bundle, f)
    
    print("Model trained and saved successfully as startup_risk_model.pkl!")

# Function to assign risk label based on cluster
def assign_risk_label(cluster):
    if cluster == 0:
        return 'Low Risk'
    elif cluster == 1:
        return 'Moderate Risk'
    elif cluster == 2:
        return 'High Risk'

# Load the model if it exists, otherwise train it
def load_model():
    try:
        with open(MODEL_FILE, 'rb') as f:
            model_bundle = pickle.load(f)
        
        return (model_bundle['label_encoders'],
                model_bundle['scaler'],
                model_bundle['kmeans'],
                model_bundle['feature_columns'])
    
    except FileNotFoundError:
        print("Model file not found. Training a new model...")
        train_and_save_model()
        return load_model()

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.json
        print("Received data:", data)
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        label_encoders, scaler, kmeans, feature_columns = load_model()
        
        input_df = pd.DataFrame([data])
        
        for col in feature_columns:
            if col not in input_df.columns:
                input_df[col] = 0
        
        input_df = input_df.fillna(0)
        input_df = input_df[feature_columns]
        
        for col in input_df.columns:
            if col in label_encoders:
                if col == 'pilot_partnerships' and isinstance(input_df[col].iloc[0], bool):
                    input_df[col] = input_df[col].astype(int)
                else:
                    try:
                        input_df[col] = label_encoders[col].transform(input_df[col].astype(str))
                    except ValueError:
                        most_freq_code = np.argmax(np.bincount(label_encoders[col].transform(label_encoders[col].classes_)))
                        input_df[col] = most_freq_code
        
        scaled_input = scaler.transform(input_df)
        cluster = kmeans.predict(scaled_input)[0]
        risk_label = assign_risk_label(cluster)
        
        distances = kmeans.transform(scaled_input)[0]
        confidence = 1 - (distances[cluster] / (np.sum(distances) + 1e-10))
        
        response_data = {
            "cluster": int(cluster),
            "risk_label": risk_label,
            "confidence": float(confidence),
            "score": int(confidence * 100)
        }
        
        return jsonify(response_data)
    
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)