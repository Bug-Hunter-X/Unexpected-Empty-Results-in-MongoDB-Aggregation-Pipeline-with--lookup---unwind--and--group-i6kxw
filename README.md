# MongoDB Aggregation Pipeline Bug

This repository demonstrates a bug encountered when using the MongoDB aggregation pipeline with `$lookup`, `$unwind`, and `$group` operators.  The pipeline unexpectedly returns empty results when no matches are found in the joined collection.

## Bug Description
The provided JavaScript code utilizes an aggregation pipeline to join two collections (`collectionA` and `collectionB`), unwind the results, and then group them. When `collectionB` lacks matching documents for entries in `collectionA`, the pipeline incorrectly produces empty results instead of returning the original documents from `collectionA` without the joined data.

## Bug Reproduction
1.  Ensure you have a MongoDB instance running.
2.  Create two collections, `collectionA` and `collectionB`, with appropriate schemas.
3.  Populate `collectionA` with documents.
4.  (Intentionally) leave `collectionB` empty, or populate it without any documents matching the foreign key in `collectionA`.
5.  Execute the provided JavaScript code.
6.  Observe that the result is an empty array, even though `collectionA` has documents.

## Solution
The solution involves using `$ifNull` within the `$group` stage to handle cases where no matching documents are found. This ensures that the original documents from `collectionA` are still returned, even if the `$unwind` stage results in an empty array.