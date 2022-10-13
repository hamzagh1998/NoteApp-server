import { NoteService } from "../../services/note.service.js";

export class NoteController {

  static verifyToken = async (token, res) => {
    let data = await NoteService.getUserId(token);
    if (data.error) 
      res.status(401).json({error: true, detail: data.detail});
  };

  static getAllNotes = async (req, res) => {
    await this.verifyToken(req.body.token, res);
    // if token verified
    const data = await NoteService.getAllNotesService();
    data.error
      ? res.status(data.code).json({error: true, detail: data.detail})
      : res.status(data.code).json({error: false, detail: data.detail});
  };

  static getNoteDetail = async (req, res) => {
    await this.verifyToken(req.body.token, res);
    // if token verified
    const data = await NoteService.getNoteDetailService(req.params.id);
    data.error
      ? res.status(data.code).json({error: true, detail: data.detail})
      : res.status(data.code).json({error: false, detail: data.detail});
  };

  static createNote = async (req, res) => {
    await this.verifyToken(req.body.token, res);
    // if token verified
    const data = await NoteService.createNoteService(req.body.payload);
    data.error
      ? res.status(data.code).json({error: true, detail: data.detail})
      : res.status(data.code).json({error: false, detail: data.detail});
  };

  static updateNote = async (req, res) => {
    await this.verifyToken(req.body.token, res);
    // if token verified
    const data = await NoteService.updateNoteService(req.params.id, req.body.payload);
    data.error
      ? res.status(data.code).json({error: true, detail: data.detail})
      : res.status(data.code).json({error: false, detail: data.detail});
  };

  static deleteNote = async (req, res) => {
    await this.verifyToken(req.body.token, res);
    // if token verified
    const data = await NoteService.deleteNoteService(req.params.id);
    data.error
      ? res.status(data.code).json({error: true, detail: data.detail})
      : res.status(data.code).json({error: false, detail: data.detail});
  };

};