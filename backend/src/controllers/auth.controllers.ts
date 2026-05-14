import type { Request,Response } from "express";
import * as service from "../services/auth.services.js"


export const registerController = async (req: Request, res: Response) => {
  try {
    const result = await service.registerService(req.body);

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const result = await service.loginService(req.body);

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const changePasswordController = async (req: Request, res: Response) => {
  try {
    const result = await service.changePasswordService(req.body);

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const allEmployeeController = async (req : Request, res: Response) =>{
 try { const result = await service.allEmployeeService()
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }

}


export const addNewEmployController = async (req : Request, res: Response) =>{
 try { const result = await service.addNewEmployeService(req.body)
  res.json(result);}
  catch(err:any){

    res.json({message:err.message})
  }

}


export const viewParticularEmployeeController = async (req: Request, res: Response) => {

try {
  const {id} = req.params
  const result = await service.viewParticluar_emp(id)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}


export const editEmployeController = async (req: Request, res: Response) => {

try {
  const {id} = req.params
  const result = await service.editEmployeService(id,req.body)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}


export const createVenueController = async (req : Request, res: Response) =>{
 try { const result = await service.createVenueService(req.body)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }

}
export const createCourtController  = async (req : Request, res: Response) =>{
 try { const result = await service.createCourtService(req.body)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }

}

export const viewVenuesController  = async (req : Request, res: Response) =>{
 try { const result = await service.viewVenuesService()
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }

}

export const viewParticluarVenueController = async (req: Request, res: Response) => {

try {
  const {id} = req.params
  const result = await service.viewParticularVenueService(id as string)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}


export const updateParticularVenuecontroller = async (req: Request, res: Response) => {

try {
  const {id} = req.params
  const result = await service.updateParticularVenueService(id as string, req.body)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}

export const AddEmpOfVenueController = async (req: Request, res: Response) => {

try {
  const {id} = req.params
  const result = await service.AddEmpOfVenueService(id as string, req.body)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}


export const editFacilitesController = async (req: Request, res: Response) => {
  
  

try {
  const {id} = req.params
  const result = await service.editFacilitesService(id as string, req.body)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}





export const view_PcourtController = async (req: Request, res: Response) => {

try {
  const {id} = req.params
  const result = await service.view_PcourtService(id as string)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}


export const editCourtController = async (req: Request, res: Response) => {

try {
  const {id} = req.params
  const result = await service.editCourtService(id as string, req.body)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}
export const removeEmpController = async (req: Request, res: Response) => {

try {
  const {id} = req.params
  const result = await service.removeEmpService(id as string, req.body)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}
export const viewAllUsersController = async (req: Request, res: Response) => {

try {
  const result = await service.viewAllUsersService()
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}


export const viewPUserController = async (req: Request, res: Response) => {
  const {id} = req.params
 

try {
  const result = await service.viewPUserService(id as string)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}

export const TimingController = async (req: Request, res: Response) => {
  const {id} = req.params
 

try {
  const result = await service.TimingService(id as string)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}

export const updateTimingController = async (req: Request, res: Response) => {
  const {id} = req.params
 

try {
  const result = await service.updateTimingService(id as string, req.body)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}


export const makeAMatchController = async (req: Request, res: Response) => { 

try {
  const result = await service.makeAMatchService(req.body)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}

export const viewMatchesServiceController = async (req: Request, res: Response) => { 

try {
  const result = await service.viewMatchesService()
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}
export const viewPMatchController = async (req: Request, res: Response) => { 
  const {id} = req.params

try {
  const result = await service.viewPMatchService(id as string)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}



export const createCheckoutSession = async (req:Request, res:Response) => {

  try {
    const { amount, match , email, _id} = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const session = await service.createCheckoutSession(
      amount,
      match,
      email,
      _id
    );

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error:any) {
    console.error("Stripe Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Stripe checkout failed",
      error: error.message,
    });
  }
};



export const updatePaymentOfMatchController = async (req: Request, res: Response) => { 
  const {id} = req.params

try {
  const result = await service.updatePaymentOfMatchService(id as string)
  res.json(result);}
  catch(err:any){
    
    res.json({message:err.message})
  }


}

export const joinMatchAfterPaymentController = async (req:Request, res:Response) => {
  try {
    const result = await service.joinMatchAfterPaymentService(req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error:any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getDashboardStatsController = async (req:Request, res:Response) => {
  try {
    const result = await service.getDashboardStatsService();
    return res.status(200).json(result);
  } catch (error:any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};