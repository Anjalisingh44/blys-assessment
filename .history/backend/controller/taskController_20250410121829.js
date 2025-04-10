const connectDb = require("../config/dbconnection");
const validateToken = require("../middleware/validateToken");
exports.addTask = (req,res) => {
    const db = connectDb()
    const {title, description} = req.body;
    const userId = req.user.id;
    const query = 'INSERT INTO tasks (user_id, title, description) VALUES (?,?,?)';
    db.query(query, [userId, title, description], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Task added successfully' });
      });
    };
    exports.viewTasks = (req,res) =>{
        const db = connectDb()
        const userId = req.user.id;
        const query = 'SELECT * FROM tasks WHERE user_id =?';
        db.query(query, [userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ tasks: results });
          });

    }
    exports.deleteTask = (req, res) => {
        const db = connectDb();
        const userId = req.user.id;
        const taskId = req.params.id;
        const query = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';
      
        db.query(query, [taskId, userId], (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          if (result.affectedRows === 0) return res.status(404).json({ message: 'Task not found' });
          res.status(200).json({ message: 'Task deleted successfully' });
        });
      };


