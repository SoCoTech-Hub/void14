# Analytics Dashboard

## Tables

This README provides an overview of the tables in the Analytics application, along with their fields and functions.

### Table: analytics_indicator_calc

This table stores indicator calculations.

#### Fields

- **contextid**: BIGINT(19)
- **endtime**: BIGINT(19)
- **id**: BIGINT(19)
- **indicator**: VARCHAR(255)
- **sampleid**: BIGINT(19)
- **sampleorigin**: VARCHAR(255)
- **starttime**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **value**: DECIMAL(10) \* The calculated value, it can be null.

### Table: analytics_models

This table stores analytic models.

#### Fields

- **contextids**: LONGTEXT(2147483647) \* The model will be restricted to this contexts
- **enabled**: BIT(1)
- **id**: BIGINT(19)
- **indicators**: LONGTEXT(2147483647)
- **name**: VARCHAR(1333) \* Explicit name of the model, the localized target name is used when left empty
- **predictionsprocessor**: VARCHAR(255)
- **target**: VARCHAR(255)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **timesplitting**: VARCHAR(255)
- **trained**: BIT(1)
- **usermodified**: BIGINT(19)
- **version**: BIGINT(19)

### Table: analytics_models_log

This table stores analytic models changes during evaluation.

#### Fields

- **dir**: LONGTEXT(2147483647)
- **evaluationmode**: VARCHAR(50)
- **id**: BIGINT(19)
- **indicators**: LONGTEXT(2147483647)
- **info**: LONGTEXT(2147483647)
- **modelid**: BIGINT(19)
- **score**: DECIMAL(10)
- **target**: VARCHAR(255)
- **timecreated**: BIGINT(19)
- **timesplitting**: VARCHAR(255)
- **usermodified**: BIGINT(19)
- **version**: BIGINT(19)

### Table: analytics_predict_samples

This table stores samples already used for predictions.

#### Fields

- **analysableid**: BIGINT(19)
- **id**: BIGINT(19)
- **modelid**: BIGINT(19)
- **rangeindex**: BIGINT(19)
- **sampleids**: LONGTEXT(2147483647)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **timesplitting**: VARCHAR(255)

### Table: analytics_prediction_actions

This table registers user actions over predictions.

#### Fields

- **actionname**: VARCHAR(255)
- **id**: BIGINT(19)
- **predictionid**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: analytics_predictions

This table stores predictions.

#### Fields

- **calculations**: LONGTEXT(2147483647)
- **contextid**: BIGINT(19)
- **id**: BIGINT(19)
- **modelid**: BIGINT(19)
- **prediction**: DECIMAL(10)
- **predictionscore**: DECIMAL(10)
- **rangeindex**: MEDIUMINT(7)
- **sampleid**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timeend**: BIGINT(19)
- **timestart**: BIGINT(19)

### Table: analytics_train_samples

This table stores samples used for training.

#### Fields

- **analysableid**: BIGINT(19)
- **id**: BIGINT(19)
- **modelid**: BIGINT(19)
- **sampleids**: LONGTEXT(2147483647)
- **timecreated**: BIGINT(19)
- **timesplitting**: VARCHAR(255)

### Table: analytics_used_analysables

This table lists analysables used by each model.

#### Fields

- **action**: VARCHAR(50)
- **analysableid**: BIGINT(19)
- **firstanalysis**: BIGINT(19)
- **id**: BIGINT(19)
- **modelid**: BIGINT(19)
- **timeanalysed**: BIGINT(19)

### Table: analytics_used_files

This table stores files that have already been used for training and prediction.

#### Fields

- **action**: VARCHAR(50)
- **fileid**: BIGINT(19)
- **id**: BIGINT(19)
- **modelid**: BIGINT(19)
- **time**: BIGINT(19)
