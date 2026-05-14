import { User, type Iuser } from "../models/user.models.js";
import bcrypt from "bcrypt"
import type { changePassword, UpdateVenueInput } from "../types/auth.types.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Courts, Venue } from "../models/venues.models.js";
import { Match, type Imatch } from "../models/matches.models.js";
import Stripe from "stripe";
import mongoose from "mongoose";


dotenv.config();


const stripe =  new Stripe(process.env.STRIPE_SECRET_KEY!)
console.log(process.env.STRIPE_SECRET_KEY);


export const registerService = async (data: Iuser) => {
  try {
    const { email, password } = data;

    const exitEmail = await User.findOne({ email });

    if (exitEmail) {
      return {
        message: "User already exists"
      };
    }
    const hashpassword = await bcrypt.hash(password, 10)
    // console.log(`hashed passwrod is hasehd here: ${hashpassword}`);
    const userdata = {
      ...data,
      password: hashpassword
    }

    await User.create(userdata);

    return {
      message: "User registered successfully"
    };

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginService = async (data: Iuser) => {
  try {

    const { email, password } = data
    const checkEmail_exists = await User.findOne({ email })
    if (!checkEmail_exists) {
      return {
        "message": "email not found "
      }

    }
    if (checkEmail_exists) {
      const isPasswordMatch = await bcrypt.compare(password, checkEmail_exists.password)
      if (!isPasswordMatch) {
        return {
          "message": "enterd password is wrong"
        }
      }

      if (isPasswordMatch) {

        const token = jwt.sign({
          _id: checkEmail_exists.id,
          name:checkEmail_exists.name,
          email: checkEmail_exists.email,
          roll: checkEmail_exists.roll

        },
          `${process.env.JWT_SECRET}`,
          {
            expiresIn: "1h"
          })


        return {
          "message": "login successfully",
          token
        }
      }
    }

  } catch (error) {
    throw error

  }
}


export const changePasswordService = async (data: changePassword) => {
  const { email, password, newPassword } = data;

  const user = await User.findOne({ email });

  if (!user) {
    return {
      message: "Email not found"
    };
  }

  // compare old password
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return {
      message: "Old password is incorrect"
    };
  }

  // prevent same password reuse
  if (password === newPassword) {
    return {
      message: "New password must be different from old password"
    };
  }

  // hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();

  return {
    message: "Password changed successfully "
  };
};


export const allEmployeeService = async () => {
  const user = await User.find({ roll: "employ" })
  return user;

}

export const addNewEmployeService = async (data: Iuser) => {
  try {
    // const { name ,email ,password, phone,} = data;

    const hashpassword = await bcrypt.hash(data.password, 10)
    // console.log(`hashed passwrod is hasehd here: ${hashpassword}`);
    const userdata = {
      ...data,
      password: hashpassword,
      roll: "employ"
    }

    await User.create(userdata as any);

    return {
      message: "Employ Add successfully"
    };

  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const viewParticluar_emp = async (id: any) => {
  if (!id) {
    return {
      message: "id not found"
    }
  }
  const user = await User.findById(id)
  if (!user) {
    return {
      message: "given id is invailid"
    }

  }
  return user

}

export const editEmployeService = async (id: any, data: Iuser) => {
  try {
    // const { name ,email ,password, phone,} = data;
    if (data.password) {

      data.password = await bcrypt.hash(data.password, 10)
    }


    const user = await User.findByIdAndUpdate(id, data)
    if (!user) {
      return {
        message: "user not found"
      }
    }
    return {
      message: "Employ edit successfully"
    };

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createVenueService = async (data: Iuser) => {


  try {
    const venue = await Venue.create(data);


    return ({
      success: true,
      data: venue
    });
  } catch (err: any) {
    return ({
      success: false,
      message: err.message
    });
  }

}


export const createCourtService = async (data: any) => {
  if (!data) {
    return {
      messsage: "data not found"
    }
  }
  const{_id , ...restData} = data
  const court = await Courts.create(restData)
  await Venue.findByIdAndUpdate(
    data._id,
    { $push: { courts: court._id } },
    { new: true }
  );
  return {
    message: "added successfully"
  }
}

export const viewVenuesService = async () => {


  const allven = await Venue.find({})
  return allven

}

export const viewParticularVenueService = async (id: string) => {
  if (!id) {
    return {
      success: false,
      message: "id not found",
      data: null,
    };
  }

  const venue = await Venue.findById(id).populate([{ path: "courts" }, { path: "employeAssociated" }]);

  if (!venue) {
    return {
      success: false,
      message: "invalid id",
      data: null,
    };
  }

  return {
    success: true,
    message: "venue fetched successfully",
    data: venue,
  };
};

export const updateParticularVenueService = async (id: string, payload: UpdateVenueInput) => {
  const updatedVenue = await Venue.findByIdAndUpdate(
    id,
    { $set: payload },
    {
      new: true,
      runValidators: true
    }
  )

  return updatedVenue
}


export const AddEmpOfVenueService = async (id: string, payload: UpdateVenueInput) => {
  const updatedVenue = await Venue.findByIdAndUpdate(
    id,
    { $set: payload },
    {
      new: true,
      runValidators: true
    }
  )

  return updatedVenue
}


export const editFacilitesService = async (id: string, data: any) => {

  if (!id) {
    return {
      success: false,
      message: "id not found",
      data: null,
    };
  }

  try {
    const updated = await Venue.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }

    );
    return {
      success: true,
      message: "court update successfully",
      data: updated,
    };

  } catch (error) {
    throw error
  }

}



export const view_PcourtService = async (id: string) => {
  if (!id) {
    return {
      success: false,
      message: "id not found",
      data: null,
    };
  }

  const court = await Courts.findById(id);

  if (!court) {
    return {
      success: false,
      message: "invalid id",
      data: null,
    };
  }

  return {
    success: true,
    message: "court fetched successfully",
    data: court,
  };
};




export const editCourtService = async (id: string, data: any) => {
  if (!id) {
    return {
      success: false,
      message: "id not found",
      data: null,
    };
  }

  try {
    const updated = await Courts.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }

    );
    return {
      success: true,
      message: "court update successfully",
      data: updated,
    };

  } catch (error) {
    throw error
  }

}



export const removeEmpService = async (id: string, data: any) => {
  if (!id) {
    return {
      success: false,
      message: "id not found",
      data: null,
    };
  }

  try {
    const remove = await Venue.findByIdAndUpdate(
      id,
      {
        $pull: data
      },
      { new: true }
    );
    return {
      success: true,
      message: "court update successfully",
      data: remove,
    };

  } catch (error) {
    throw error
  }

}



export const viewAllUsersService = async () => {

  try {
    const Users = await User.find({ roll: "user" })

    return {
      success: true,
      message: "Users fetch sucessfully successfully",
      data: Users,
    };

  } catch (error) {
    throw error
  }

}



export const viewPUserService = async (id: string) => {

  try {
    const PUser = await User.findById(id)

    return {
      success: true,
      message: "User fetch  successfully",
      data: PUser,
    };

  } catch (error) {
    throw error
  }

}


export const TimingService = async (id: string) => {

  try {
    const venue = await Venue.findById(id)
     const timing = venue?.timing

    return {
      success: true,
      message: "User fetch  successfully",
      data: timing,
    };

  } catch (error) {
    throw error
  }

}

export const updateTimingService = async (id: string,data:any) => {

  try {
    const Timing = await Venue.findByIdAndUpdate(id,
      {$set:{timing:data}},
      {new:true}
    )

    return {
      success: true,
      message: "User fetch  successfully",
      data:  Timing,
    };

  } catch (error) {
    throw error
  }

}
export const makeAMatchService = async (data:Imatch) => {

  if(!data){
    return{
      success:false,
      message:"Data not found"

    }

  }
  try{
    const match = await Match.create(data)
    console.log("the matchid is ",match._id)
     return {
      success: true,
      message: "match is created successfully",
      data:  data,
      matchId : match._id
    }
    
}catch (error) {
    throw error
  }
}


export const viewMatchesService = async () => {

  try{
    const matches =  await Match.find().populate([{ path: "createdBy" },{ path: "venue" }]);
    console.log(matches);
    

    if(!matches){
      return {
      success: false,
      message: "No match found",
    }

    }
    return {
      success: true,
      message: 'found successfully',
      data: matches
    }
     
}catch (error) {
    throw error
  }
}



export const viewPMatchService = async (id:string) => {

  try{
    const match =  await Match.findById(id)
    .populate([{ path: "createdBy" }, {path:"teamA.player1"},{path:"teamA.player2"},{path:"teamB.player1"},{path:"teamB.player2"},{ path: "venue" },{ path: "court" }]);

    if(!match){
      return {
      success: false,
      message: "No match found",
    }

    }
    return {
      success: true,
      message: 'found successfully',
      data: match
    }
     
}catch (error) {
    throw error
  }
}


export const createCheckoutSession = async (amount:number, productName:string ,email:string, _id:string) => {
  
  console.log("the match id is the service i mean in the backend is :", _id)

  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: productName || "Product Payment",
            description:email || "arshdeep singh"
            
          },
          unit_amount: amount * 100, // ₹500 => 50000 paise
          
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.FRONTEND_URL}/payment-success/${_id}`,
    cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
  });
};



export const updatePaymentOfMatchService = async (id: string) => {
  if (!id) {
    return {
      success: false,
      message: "id not found",
      data: null,
    };
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      success: false,
      message: "Invalid match id",
      data: null,
    };
  }

  try {
    const updated = await Match.findByIdAndUpdate(
      id,
      { $set: { payment: "complete" } },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!updated) {
      return {
        success: false,
        message: "Match not found",
        data: null,
      };
    }

    return {
      success: true,
      message: "Match payment updated successfully",
      data: updated,
    };
  } catch (error) {
    console.log("PAYMENT UPDATE ERROR:", error);
    throw error;
  }
};


export const joinMatchAfterPaymentService = async (data:any) => {
  const { matchId, playerId, whichPlayer } = data;

  const allowedSlots = [
    "teamA.player1",
    "teamA.player2",
    "teamB.player1",
    "teamB.player2",
  ];

  if (!allowedSlots.includes(whichPlayer)) {
    return { success: false, message: "Invalid slot" };
  }

  const updated = await Match.findByIdAndUpdate(
    matchId,
    {
      $set: {
        [whichPlayer]: playerId,
        payment: "complete",
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  return {
    success: true,
    message: "Player joined successfully",
    data: updated,
  };
};



export const getDashboardStatsService = async () => {
  const matches = await Match.find()
    .populate("createdBy")
    .populate("venue")
    .populate("court")
    .sort({ createdAt: -1 });

  const today = new Date().toDateString();

  const totalMatches = matches.length;

  const padelMatches = matches.filter(
    (m) => m.gameType === "padel"
  ).length;

  const pickleballMatches = matches.filter(
    (m) => m.gameType === "pickleball"
  ).length;

  const ongoingMatches = matches.filter(
    (m) => m.status === "ongoing"
  );

  const todaySchedule = matches.filter(
    (m) => new Date(m.date).toDateString() === today
  );

  const recentBookings = matches.slice(0, 5);

  return {
    success: true,
    data: {
      totalMatches,
      padelMatches,
      pickleballMatches,
      ongoingMatches,
      todaySchedule,
      recentBookings,
    },
  };
};