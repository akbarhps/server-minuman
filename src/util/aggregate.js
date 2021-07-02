const {ObjectId} = require('mongoose').Types;

exports.productAggregate = (id = undefined, page = 0, limit = 10) => {
    let aggregate = [];
    if (id) {
        aggregate.push({
            "$match": {"_id": ObjectId(id)}
        });
    }
    Array.prototype.push.apply(aggregate, [
        {"$skip": page * limit},
        {"$limit": limit},
        {
            "$lookup": {
                from: 'category',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category',
            }
        },
        {"$unwind": "$category"},
        {"$unset": "categoryId"},
        {
            "$lookup": {
                from: 'images',
                localField: '_id',
                foreignField: 'parentId',
                as: 'images',
            }
        }
    ]);
    return aggregate;
}