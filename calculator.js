const express = require("express");
const app = express();
const ExpressError = require("./expressError");

app.use(express.json());
const { converter, findMode, findMean, findMedian } = require("./helpers");

// router handler to calculate the mean
app.get("/mean", function (req, res, next) {
  // if no values are entered, we return en error with EC 400
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  try {
    let nums = converter(req.query.nums);
    let result = {
      operation: "mean",
      result: findMean(nums),
    };
    return res.send(result);
  } catch (err) {
    next(err);
  }
});

app.get("/median", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  try {
    let nums = getNums(req.query.nums);
    let result = {
      operation: "median",
      result: findMedian(nums),
    };

    return res.send(result);
  } catch (err) {
    next(err);
  }
});

app.get("/mode", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  try {
    let result = {
      operation: "mode",
      result: findMode(nums),
    };

    return res.send(result);
  } catch (err) {
    next(err);
  }
});

// calculate the three operations: media, mode and mean and display the result

app.get("/all", function (req, res, next) {
  try {
    const nums = converter(req.query.nums);
    const mean = findMean(nums);
    const median = findMedian(nums);
    const mode = findMode(nums);

    return res.json({
      operation: "all",
      mean: mean,
      median: median,
      mode: mode,
    });
  } catch (err) {
    next(err);
  }
});

/** general error handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message,
  });
});

app.listen(3000, function () {
  console.log(`Server starting on port 3000`);
});
