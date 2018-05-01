# Make sure to: install.packages("tree")
install.packages("tree")
library(tree)

print("Account address: 0x82b6222b166d49960e9fdcc680fe96e71a573ae92cd676b4b9b3a06b373d54df")
print("Loading data...")
# Load data from CSV files.testset.csv is the tournament data
dftrain = read.csv("trainingset.csv")
dftest = read.csv("testset.csv")
test_outcome = read.csv("testoutcome.csv")


print("Training...")
# This is your model that will learn to predict. Your model is trained on the trainingset
tree_model = tree(Outcome ~ Pregnancies + Glucose + BloodPressure + 
                    SkinThickness + Insulin + BMI + DiabetesPedigreeFunction + 
                    Age, data=dftrain)

print("Predicting training set...")
# Your trained model is now used to make predictions on the trainingset
in_sample_pred = predict(tree_model, newdata = dftrain)
in_sample_pred_01 = round(in_sample_pred)
in_sample_pred_01[in_sample_pred_01 < 0] = 0
in_sample_pred_01[in_sample_pred_01 > 1] = 1
training_accuracy = sum(dftrain$Outcome == in_sample_pred_01)/length(dftrain$Outcome)

sprintf("Training set accuracy is %s %%", training_accuracy * 100)

print("Predicting tournament data...")
# Your trained model is now used to make predictions on the tournament data
out_sample_pred = predict(tree_model, newdata = dftest)
out_sample_pred_01 = round(out_sample_pred)
out_sample_pred_01[out_sample_pred_01 < 0] = 0
out_sample_pred_01[out_sample_pred_01 > 1] = 1
test_accuracy = sum(test_outcome$Outcome == out_sample_pred_01)/length(test_outcome$Outcome)

sprintf("Test set accuracy is %s %%", test_accuracy * 100)

print("Writing predictions to predictions.csv")
# Save the predictions out to a CSV file
pred = data.frame(Outcome = out_sample_pred_01)
write.csv(pred, file="predictions.csv", quote=F, row.names=F)

