const connection = require('../config/connection');

function Todo() {
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM todo_list', function(err, result) {
        con.release();
        if (err) {
          console.log('🟥 Get failed:', err);
          res.status(500).json({ status: 1, message: 'Failed to load todos' });
        } else {
          console.log('✅ Get successful, returning:', result);
          res.json(result);
        }
      });
    });
  };

  this.getByID = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM todo_list WHERE id = ?', id, function(err, result) {
        con.release();
        if (err) {
          console.log('🟥 Get by ID failed:', err);
          res.status(500).json({ status: 1, message: 'Failed to get todo by ID' });
        } else {
          console.log("✅ Get by ID successful:", result);
          res.json(result);
        }
      });
    });
  };

  this.create = function(todo, res) {
    console.log("🟨 Received new todo:", todo);  // Debug log
    connection.acquire(function(err, con) {
      con.query('INSERT INTO todo_list SET ?', todo, function(err, result) {
        con.release();
        if (err) {
          console.log("🟥 Create failed:", err);
          res.status(500).json({ status: 1, message: 'TODO creation fail' });
        } else {
          console.log("✅ Post successful, inserted ID:", result.insertId);
          res.status(201).json({ id: result.insertId, ...todo });
        }
      });
    });
  };

  this.update = function(todo, id, res) {
    connection.acquire(function(err, con) {
      con.query('UPDATE todo_list SET name = ? WHERE id = ?', [todo, id], function(err, result) {
        con.release();
        if (err) {
          console.log("🟥 Update failed:", err);
          res.status(500).json({ status: 1, message: 'TODO update fail' });
        } else {
          console.log("✅ Update successful:", result);
          res.json({ status: 0, message: 'TODO update success' });
        }
      });
    });
  };

  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('DELETE FROM todo_list WHERE id = ?', id, function(err, result) {
        con.release();
        if (err) {
          console.log("🟥 Delete failed:", err);
          res.status(500).json({ status: 1, message: 'TODO delete fail' });
        } else {
          console.log("✅ Delete successful:", result);
          res.json({ status: 0, message: 'TODO delete success' });
        }
      });
    });
  };
}

module.exports = new Todo();
