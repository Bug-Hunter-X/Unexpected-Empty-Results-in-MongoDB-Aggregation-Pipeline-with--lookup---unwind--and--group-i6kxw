```javascript
const pipeline = [
  {
    $lookup: {
      from: "collectionB",
      localField: "_id",
      foreignField: "foreignKey",
      as: "results",
    },
  },
  {
    $unwind: {
      path: "$results",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $group: {
      _id: "$_id",
      data: {
        $push: "$results",
      },
    },
  },
  {
    $project: {
      _id: 1,
      data: {
        $ifNull: ["$data", []],
      },
    }
  }
];

const result = await collectionA.aggregate(pipeline).toArray();
```