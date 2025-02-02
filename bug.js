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
    $unwind: "$results",
  },
  {
    $group: {
      _id: "$_id",
      data: {
        $push: "$results",
      },
    },
  },
];

const result = await collectionA.aggregate(pipeline).toArray();
```