import { Request, Response } from 'express';
import { HondaService } from '../services/honda.service';
const messages = {
    succuss : "Data fetched Succusfully",
    NoData : "No Data was found for your query",
    invalid : "The Input was invalid"
}

const hondaService = new HondaService()

export const getModelsByYear = async (req: Request, res: Response) => {
  try {
    const year = parseInt(req.params['year'])
    if(!year){
        res.status(400).json({ error: messages.invalid })
        return
    }
    const models = await hondaService.getModelsByYear(year)
    const message = models.length? messages.succuss : messages.NoData
    res.status(200).json({message: message, data: models});
  } catch (error) {
    console.error('Error in getUsers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getDiscontinuedModels = async (req: Request, res: Response) => {
    try {
      
      const models = await hondaService.getDiscontinuedModels()
      res.status(200).json(models);
    } catch (error) {
      console.error('Error in getUsers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

