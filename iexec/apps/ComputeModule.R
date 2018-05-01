args = commandArgs(trailingOnly=TRUE)

# if (length(args) != 4) {
#   stop("At least two arguments : test targets and predictions must be supplied.n", call.=FALSE)
# }
# 
# if (! url.exists(args[1])){
#   stop(c("wrong url:", args[1]), call.=FALSE)
# }

download.file(url=args[1], destfile='trainingset.csv', method='curl')
download.file(url=args[2], destfile='testset.csv', method='curl')
download.file(url=args[3], destfile='machinelearningmodel.R', method='curl')
download.file(url=args[4], destfile='testoutcome.csv', method='curl')

source('./machinelearningmodel.R')
predictions = read.csv("predictions.csv")
test_outcome = read.csv("testoutcome.csv")
test_accuracy = sum(test_outcome$Outcome == predictions$Outcome)/length(test_outcome$Outcome)
print(sprintf("Test set accuracy is %s %%", test_accuracy * 100))
