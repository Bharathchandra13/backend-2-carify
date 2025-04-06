console.log("fghjkl");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require('body-parser');

// Import models (do not change the file names)
const User = require("./module/signupSchema.js");
const Login = require("./module/loginSchema.js");
const Carpool = require("./module/carpoolSchema");
const Ride = require("./module/RideSchema");
const PoolerCreation = require("./module/PoolerCreation");
const FullRide = require("./module/fullRideSchema");
const Service = require("./module/serviceModel.js"); 
const ServiceUser = require('./module/ServiceUser');
const Booking = require("./module/Booking.js");
const bookingSchema = require("./module/bookingSchema.js");
const Appointment = require("./module/Appointment.js");



dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // For form-data
app.use(cors());
const upload = multer();
app.use(bodyParser.json());

const MONGO_URI = "mongodb+srv://bharath:bharath123@cluster0.zyvp4.mongodb.net/CarifyDB?retryWrites=true&w=majority";

mongoose
    .connect(MONGO_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// ✅ Base Route
app.get("/", (req, res) => {
    res.send("🚀 Welcome to Carify Backend API");
});

// ✅ Test Route
app.post("/api/carpool/book", async (req, res) => {
    console.log("Carpool booking route hit!");
    res.status(200).json({ message: "Route is working!" });
});

// 🟢 Get all users
app.get("/api/login", async (req, res) => {
    try {
        const users = await Login.find({});
        res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

// 🟢 Signup (User Registration)
// 🟢 Signup (User Registration)
app.post("/api/signup", upload.none(), async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate required fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                status: false,
                message: "All fields (name, email, password, role) are required",
                data: []
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: "Email already registered",
                data: []
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        return res.status(201).json({
            status: true,
            message: "User registered successfully",
            data: [
                {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            ]
        });
    } catch (err) {
        console.error("Signup Error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: []
        });
    }
});

// 🟢 Login (Registration)
// 🟢 Login (User Authentication)
app.post("/api/login", upload.none(), async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required",
                data: []
            });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password",
                data: []
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Login successful",
            data: [
                {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role
                }
            ]
        });
    } catch (err) {
        console.error("Login error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: []
        });
    }
});



// 🟢 Update user by ID
app.put("/api/login/:id", upload.none(), async (req, res) => {
    try {
        const { id } = req.params;

        // Find and update the user
        const updatedLogin = await Login.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedLogin) {
            return res.status(404).json({
                status: false,
                message: "User not found",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "User updated successfully",
            data: [
                {
                    id: updatedLogin._id,
                    name: updatedLogin.name,
                    email: updatedLogin.email
                }
            ]
        });
    } catch (err) {
        console.error("Update User Error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: []
        });
    }
});


// 🟢 Delete user by ID
app.delete("/api/login/:id", upload.none(), async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the user
        const removedUser = await Login.findByIdAndDelete(id);

        if (!removedUser) {
            return res.status(404).json({
                status: false,
                message: "User not found",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "User removed successfully",
            data: []
        });
    } catch (err) {
        console.error("Delete User Error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: []
        });
    }
});


// 🟢 User login route
app.post("/api/users", upload.none(), async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required",
                data: []
            });
        }

        // Check if user exists
        const existingUser = await Login.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                status: false,
                message: "User not found",
                data: []
            });
        }

        // Validate password
        if (existingUser.password !== password) {
            return res.status(401).json({
                status: false,
                message: "Invalid password",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Login successful",
            data: [
                {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email
                }
            ]
        });
    } catch (err) {
        console.error("User Login Error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: []
        });
    }
});


// ✅ BOOKING ROUTE
app.post('/api/bookings', async (req, res) => {
  try {
    const { username, carModel, contactNumber, timeSlot, garageId } = req.body;

    const newBooking = new Booking({
      username,
      carModel,
      contactNumber,
      timeSlot,
      garageId,
      status: 'pending'
    });

    const savedBooking = await newBooking.save();

    return res.status(200).json({
      status: true,
      message: "Booking created successfully",
      data: [savedBooking] // ✅ data array for SwiftUI
    });

  } catch (err) {
    console.error("Error saving booking:", err);
    return res.status(500).json({
      status: false,
      message: err.message,
      data: []
    });
  }
});

// Get all bookings for a specific garage
app.get("/api/garage/:garageId/appointments", async (req, res) => {
    try {
        const { garageId } = req.params;
        const bookings = await Booking.find({ garageId, status: "Completed" });

        res.json({ status: true, message: "Appointments fetched successfully", data: bookings });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message, data: [] });
    }
});



















































































































// Create a new carpool entry
app.post('/api/carpool', async (req, res) => {
    try {
        const { pickupLocation, dropoffLocation, selectedDate, numberOfTravelers } = req.body;

        const newCarpool = new Carpool({ pickupLocation, dropoffLocation, selectedDate, numberOfTravelers });
        await newCarpool.save();

        return res.status(201).json({
            status: true,
            message: "Carpool created successfully",
            data: [
                {
                    id: newCarpool._id,
                    pickupLocation: newCarpool.pickupLocation,
                    dropoffLocation: newCarpool.dropoffLocation,
                    selectedDate: newCarpool.selectedDate,
                    numberOfTravelers: newCarpool.numberOfTravelers
                }
            ]
        });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
});

// Search available rides
app.get('/api/search', async (req, res) => {
    try {
        const { from, to, date, travelers } = req.query;

        if (!from || !to || !date || !travelers) {
            return res.status(400).json({
                status: false,
                message: "Missing required query parameters",
                data: []
            });
        }

        const availableRides = await Ride.find({
            pickupLocation: from,
            dropoffLocation: to,
            selectedDate: date,
            availableSeats: { $gte: travelers }
        });

        if (availableRides.length === 0) {
            return res.status(200).json({
                status: true,
                message: "No available rides for this route",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Available rides found",
            data: availableRides.map(ride => ({
                id: ride._id,
                name: ride.driverName,
                car: ride.carModel,
                price: ride.price,
                time: ride.time,
                rating: ride.rating,
                image: ride.imageUrl,
                pickup: ride.pickupLocation,
                dropoff: ride.dropoffLocation,
                availableSeats: ride.availableSeats
            }))
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message,
            data: []
        });
    }
});


app.post("/api/poolercreation", async (req, res) => {
    try {
        const newPooler = new PoolerCreation(req.body);
        await newPooler.save();
        res.status(201).json({
            status: true,
            message: "Pooler ride created",
            data: {
                id: newPooler._id,
                name: newPooler.driverName,
                car: newPooler.carModel,
                price: newPooler.price,
                time: newPooler.time,
                rating: newPooler.rating,
                image: newPooler.imageUrl,
                pickup: newPooler.pickupLocation,
                dropoff: newPooler.dropoffLocation,
                availableSeats: newPooler.availableSeats
            }
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
            data: []
        });
    }
});


app.get("/api/poolercreation/search", async (req, res) => {
    try {
        const { leavingFrom, goingTo, selectedDate, travelers } = req.query;

        // Convert date to start and end of the day
        const startDate = new Date(selectedDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(selectedDate);
        endDate.setHours(23, 59, 59, 999);

        // Find rides based on location, date, and available seats
        const availableRides = await PoolerCreation.find({
            leavingFrom,
            goingTo,
            selectedDate: { $gte: startDate, $lte: endDate }, // Match rides on selected date
            selectedSeats: { $gte: travelers } // Check if enough seats are available
        });

        if (availableRides.length === 0) {
            return res.status(200).json({
                status: false,
                message: "No rides available for this route and date",
                data: []
            });
        }

        res.status(200).json({
            status: true,
            message: "Available rides found",
            data: availableRides.map(ride => ({
                id: ride._id,
                name: ride.driverName,
                car: ride.carModel,
                price: ride.rideCost,
                time: ride.time,
                rating: ride.rating,
                image: ride.imageUrl,
                pickup: ride.leavingFrom,
                dropoff: ride.goingTo,
                availableSeats: ride.selectedSeats
            }))
        });

    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
            data: []
        });
    }
});

// POST - Create Full Ride Booking
app.post('/api/full-ride', async (req, res) => {
    try {
        const { leavingFrom, goingTo, selectedDate, vehicleType } = req.body;
        if (!leavingFrom || !goingTo || !selectedDate || !vehicleType) {
            return res.status(400).json({ 
                status: false, 
                message: "All fields are required", 
                data: [] 
            });
        }

        const newRide = new FullRide({ leavingFrom, goingTo, selectedDate, vehicleType });
        await newRide.save();

        return res.status(200).json({
            status: true,
            message: "Full ride booked successfully",
            data: {
                id: newRide._id,
                leavingFrom: newRide.leavingFrom,
                goingTo: newRide.goingTo,
                selectedDate: newRide.selectedDate,
                vehicleType: newRide.vehicleType
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message,
            data: []
        });
    }
});

// GET - Fetch All Full Ride Bookings
app.get('/api/full-ride', async (req, res) => {
    try {
        const rides = await FullRide.find().sort({ createdAt: -1 });

        return res.status(200).json({
            status: true,
            message: "Full ride bookings fetched successfully",
            data: rides.map(ride => ({
                id: ride._id,
                leavingFrom: ride.leavingFrom,
                goingTo: ride.goingTo,
                selectedDate: ride.selectedDate,
                vehicleType: ride.vehicleType
            }))
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message,
            data: []
        });
    }
});

// ✅ Create a Service
app.post('/api/services', async (req, res) => {
    try {
        const { name, type, location, description, contactInfo, price } = req.body;
        const newService = new Service({ name, type, location, description, contactInfo, price });
        await newService.save();

        return res.status(200).json({
            status: true,
            message: "Service Created Successfully",
            data: newService
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message,
            data: []
        });
    }
});

// ✅ GET /api/services?location=SomePlace
app.get('/api/services', async (req, res) => {
    try {
        const { type, location } = req.query;
        const filter = {};

        if (type) filter.type = type;
        if (location) filter.location = location;

        const services = await Service.find(filter).lean();

        // Format `_id` to `id` to match Swift model
        const formatted = services.map(service => ({
            ...service,
            id: service._id,
        }));

        return res.status(200).json({
            status: true,
            message: 'Filtered Services Retrieved Successfully',
            data: formatted
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message,
            data: []
        });
    }
});
app.post("/api/emergency-sos", async (req, res) => {
    try {
        const { location } = req.body;

        if (!location) {
            return res.status(400).json({
                status: false,
                message: "Location is required",
                data: []
            });
        }

        // Fetch car service providers from the Service collection
        const services = await Service.find({
            location: { $regex: location, $options: "i" }
        });

        console.log("Fetched Services:", services); // Debugging output

        if (services.length === 0) {
            return res.status(200).json({
                status: true,
                message: "No emergency SOS services found in this location",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Available emergency SOS services found",
            data: services.map(service => ({
                id: service._id,
                name: service.name,
                location: service.location,
                contactInfo: service.contact || "Not Available",  // Ensure contact is displayed
               
            }))
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({
            status: false,
            message: err.message,
            data: []
        });
    }
});






//profile section for servicre

// Get Profile Info
app.post('/api/profile/get', async (req, res) => {
    const { userId } = req.body;
    try {
      const user = await User.findById(userId);
      res.json({ status: true, message: 'Profile fetched', data: [user] });
    } catch (error) {
      res.json({ status: false, message: 'Error fetching profile', data: [] });
    }
  });
  
  // Update Profile Info
  app.post('/api/profile/update', async (req, res) => {
    const { userId, name, email, phone } = req.body;
    try {
      const updated = await User.findByIdAndUpdate(
        userId,
        { name, email, phone },
        { new: true }
      );
      res.json({ status: true, message: 'Profile updated', data: [updated] });
    } catch (error) {
      res.json({ status: false, message: 'Error updating profile', data: [] });
    }
  });
  
  // ------------------- VIEW MY BOOKINGS -------------------
  
 app.post("/api/profile/my-bookings", async (req, res) => {
    const { userId } = req.body;

    try {
        const bookings = await Booking.find({ userId });

        const responseData = bookings.map(b => ({
            _id: b._id,
            serviceType: b.serviceType || b.carModel || "Service",
            location: b.garageId,
            status: b.status
        }));

        res.json({
            status: true,
            message: "User bookings fetched successfully",
            data: responseData
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.json({
            status: false,
            message: "Failed to fetch user bookings",
            data: []
        });
    }
});

  
  // ------------------- APPOINTMENTS (FOR GARAGE) -------------------
  
app.get('/api/garage/:garageId/appointments', async (req, res) => {
  const { garageId } = req.params;

  try {
    const appointments = await Appointment.find({ garageId }).populate('userId');

    const formatted = appointments.map(appt => ({
      id: appt._id,
      username: appt.userId?.name || "No Name", // ✅ from populated user
      email: appt.userId?.email || "Not Provided",
      serviceType: appt.serviceType,
      userCar: appt.userCar,
      date: appt.date,
      location: appt.location || "Not Provided",
      contactNumber: appt.contactNumber,
      status: appt.status,
      garageID: appt.garageId,
      notes: appt.notes || ""
    }));

    res.json({
      status: true,
      message: 'Appointments fetched successfully',
      data: formatted
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: false,
      message: 'Failed to fetch appointments',
      data: []
    });
  }
});

  
  // ------------------- GARAGE BOOKINGS -------------------
  
  // Garage person’s previous & upcoming bookings
  app.post('/api/profile/garage-bookings', async (req, res) => {
    const { garageId } = req.body;
    try {
      const bookings = await Booking.find({ garageId }).populate('userId');
      res.json({ status: true, message: 'Garage bookings fetched', data: bookings });
    } catch (error) {
      res.json({ status: false, message: 'Error fetching garage bookings', data: [] });
    }
  });



































































































































































































































app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
