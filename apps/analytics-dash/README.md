# Analytics Dash

## Tables

List of Tables with their function described below:

### analytics_indicator_calc

Table Stored indicator calculations

#### Fields

- id
- context_id
- indicator
- sample_id
- sample_origin
- start_time
- end_time
- value - The calculated value, it can be null.
- created_at
- updated_at

### analytics_models

Table Analytic models.

#### Fields

- id
- context_ids \* The model will be restricted to this contexts
- enabled
- indicators
- name \* Explicit name of the model, the localised target name is used when left empty
- predictions_processor
- target
- time_splitting
- trained
- version
- user
- created_at
- updated_at

### analytics_models_log

Table Analytic models changes during evaluation.

#### Fields

- id
- dir
- evaluation_mode
- indicators
- info
- model_id
- score
- target
- time_splitting
- version
- user
- created_at
- updated_at

### analytics_predict_samples

Table Samples already used for predictions.

#### Fields

- id
- analysable_id
- model_id
- range_index
- sample_ids
- time_splitting
- created_at
- updated_at

### analytics_prediction_actions

Table Register of user actions over predictions.

#### Fields

- id
- action_name
- prediction_id
- user
- created_at
- updated_at

### analytics_predictions

Table Predictions

#### Fields

- id
- calculations
- context_id
- model_id
- prediction
- prediction_score
- range_index
- sample_id
- start_time
- end_time
- created_at
- updated_at

### analytics_train_samples

Table Samples used for training

#### Fields

- id
- analysable_id
- model_id
- sample_ids
- time_splitting
- created_at
- updated_at

### analytics_used_analysables

Table List of analysables used by each model

#### Fields

- id
- action
- analysable_id
- first_analysis
- model_id
- time_analysed

### analytics_used_files

Table Files that have already been used for training and predictions

#### Fields

- id
- action
- file_id
- model_id
- time
