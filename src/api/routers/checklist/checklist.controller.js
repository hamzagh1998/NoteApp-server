import { ChecklistService } from "../../services/checklist.service.js";


export class ChecklistController {

  static verifyToken = async (token, res) => {
    let data = await ChecklistService.getUserId(token);
    if (data.error) 
      res.status(401).json({error: true, detail: data.detail});
  };

  static getAllChecklists = async (req, res) => {
    await this.verifyToken(req.body.token, res);
    // if token verified
    const data = await ChecklistService.getAllChecklistsService();
    data.error
      ? res.status(data.code).json({error: true, detail: data.detail})
      : res.status(data.code).json({error: false, detail: data.detail});
  };

  static getChecklistDetail = async (req, res) => {
    await this.verifyToken(req.body.token, res);
    // if token verified
    const data = await ChecklistService.getChecklistDetail(req.params.id);
    data.error
      ? res.status(data.code).json({error: true, detail: data.detail})
      : res.status(data.code).json({error: false, detail: data.detail});
  };

  static createChecklist = async (req, res) => {
    await this.verifyToken(req.body.token, res);
    // if token verified
    const data = await ChecklistService.createChecklistService(req.body.payload);
    data.error
      ? res.status(data.code).json({error: true, detail: data.detail})
      : res.status(data.code).json({error: false, detail: data.detail});
  };

  static updateChecklist = async (req, res) => {
    await this.verifyToken(req.body.token, res);
    // if token verified
    const data = await ChecklistService.updateChecklistService(req.params.id, req.body.payload);
    data.error
      ? res.status(data.code).json({error: true, detail: data.detail})
      : res.status(data.code).json({error: false, detail: data.detail});
  };

  static deleteChecklist = async (req, res) => {
    await this.verifyToken(req.body.token, res);
    // if token verified
    const data = await ChecklistService.deleteChecklistService(req.params.id);
    data.error
      ? res.status(data.code).json({error: true, detail: data.detail})
      : res.status(data.code).json({error: false, detail: data.detail});
  };  

};