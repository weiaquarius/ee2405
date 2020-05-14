if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function listTodos(unaccomplishedOnly = false,searchText = '', start) {
    const where = [];
    if (searchText)
        where.push(`text ILIKE '%$1:value%'`);
    if (start)
        where.push('id < $2');

    if(unaccomplishedOnly)
        where.push('$3:name = 0');
        
    const sql = `
        SELECT *
        FROM todos
        ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY id DESC
        LIMIT 10
    `;
    return db.any(sql, [searchText, start,"doneTs"]);
}

function createTodo(mood, text) {
    const sql = `
        INSERT INTO todos ($<this:name>)
        VALUES ($<mood>, $<text>)
        RETURNING *
    `;
    return db.one(sql, {mood, text});
}

function accomplishTodo(id){
    const sql = `
        UPDATE todos
        SET "doneTs" = (extract(epoch from now()))
        WHERE id = $1
        RETURNING *
    `;
    return db.one(sql, [id]);
}

module.exports = {
    listTodos,
    createTodo,
    accomplishTodo
};
