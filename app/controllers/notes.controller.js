const db = require("../models");
const Note = db.notes;

exports.allNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.editNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const note = await Note.findOne({ where: { id } });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.title = title;
    note.description = description;
    note.status = status;
    await note.save();

    res.status(200).json("Note edited successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addNewNote = (req, res) => {
  try {
  Note.create({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  })
    .then(res.status(200).send({ message: "New note added successfully!" }));

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findOne({ where: { id } });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await note.destroy();

    res.status(200).json("Note removed successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.filterByTitle = async (req, res) => {
  const { title, filter } = req.query;

  try {
    const notes = await ModelName.findAll({
      where: {
        [title]: {
          [Op.iLike]: `%${filter}%`
        }
      }
    }); 

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: 'No notes found' });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.filterByStatus = async (req, res) => {
  const { status, filter } = req.query;

  try {
    const notes = await ModelName.findAll({
      where: {
        [status]: {
          [Op.iLike]: `%${filter}%`
        }
      }
    }); 

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: 'No notes found' });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.filterByCreatedDate = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const notes = await ModelName.findAll({
      where: {
        [createdAt]: {
          [Op.between]: [startDate, endDate]
        }
      }
    }); 

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: 'No notes found' });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};