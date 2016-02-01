
exports.getModel = function (orm, db) {
    return db.define('book', {
        name      :     { type: 'text', required: true },
        author    :     { type: 'text' },
        publisher :     { type: 'text' },
        price     :     { type: 'number' },
        link      :     { type: 'text' },
        year      :     { type: 'integer' }
    });
}
