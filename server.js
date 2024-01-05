const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Schedule = require('./Schedule');

const app = express();
const port = 3000;

const uri = "mongodb+srv://NikoG:UUVkTyZ1ieLj5Bnw@cluster0.eleisx0.mongodb.net/?retryWrites=true&w=majority";


const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"]
const hoursOfDay = ["eightOClock", "nineOClock", "tenOClock", "elevenOClock"]

app.use(bodyParser.json());

app.use(cors({

  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:8080'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

  methods: ['GET', 'POST'], // Erlaubte HTTP-Methoden
  allowedHeaders: ['Content-Type', 'Authorization'], // Erlaubte Header
}))

function createSchedule() {
  return null;
}

async function createSchedule() {
    // Create a new blog post object
    const schedule = new Schedule({
      days: {
        monday: { date: "06.11.", isOfflineDay: true},
        tuesday: { date: "07.11.", isOfflineDay: false},
        wednesday: { date: "08.11.", isOfflineDay: true},
        thursday: { date: "09.11.", isOfflineDay: false},
        friday: { date: "10.11.", isOfflineDay: false}
      },

      schedule: {
        
        eightOClock: {
          monday: {
            name: "Mathematics",
            category: "categoryA",
            optionalText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A eum rerum recusandae commodi, repellendus libero, cum."
          },
          tuesday: {
            name: "English",
            category: "categoryC",
            optionalText: ""
          },
          wednesday: {
            name: "Science",
            category: "categoryB",
            optionalText: "optinal Text 1"
          },
          thursday: {
            name: "",
            category: "",
            optionalText: "optinal Text 6"
          },
          friday: {
            name: "Mathematics",
            category: "categoryA",
            optionalText: "optinal Text 1"
          }
        },
        "nineOClock": {
          monday: {
            name: "Mathematics",
            category: "categoryA",
            optionalText: "optinal Text 4"
          },
          tuesday: {
            name: "",
            category: "",
            optionalText: ""
          },
          wednesday: {
            name: "Physics",
            category: "categoryC",
            optionalText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A eum rerum recusandae commodi, repellendus libero."
          },
          thursday: {
            name: "Music",
            category: "categoryA",
            optionalText: ""
          },
          friday: {
            name: "",
            category: "",
            optionalText: ""
          }
        },
        tenOClock: {
          monday: {
            name: "",
            category: "",
            optionalText: ""
          },
          tuesday: {
            name: "Geography",
            category: "categoryB",
            optionalText: "optinal Text 5"
          },
          wednesday: {
            name: "",
            category: "",
            optionalText: "optinal Text 9"
          },
          thursday: {
            name: "Chemistry",
            category: "categoryB",
            optionalText: "optinal Text 8"
          },
          friday: {
            name: "",
            category: "",
            optionalText: ""
          }
        },
        elevenOClock: {
          monday: {
            name: "Science",
            category: "categoryB",
            optionalText: "optinal Text 15"
          },
          tuesday: {
            name: "Physical Education",
            category: "categoryB",
            optionalText: "optinal Text 1"
          },
          wednesday: {
            name: "",
            category: "",
            optionalText: ""
          },
          thursday: {
            name: "Music",
            category: "categoryA",
            optionalText: "optinal Text 4"
          },
          friday: {
            name: "Foreign Language",
            category: "categoryB",
            optionalText: "optinal Text 2"
          }
        }
      }

    });
    console.log(schedule)

    // Insert the article in our MongoDB database
    await schedule.save();
    console.log(schedule)
}

async function getSchedule() {
  //655a9287e7484a47287c496a
  const schedule = await Schedule.findById("655a9287e7484a47287c496a")
  return schedule
}



async function main() {

  try {

    //await getSchedule();

  } catch (e) {
    console.log(e.message)
  }

  // Find a single blog post
  //const firstUser = await User.findOne({});
  //console.log(firstArticle);


	/*const client = new MongoClient(uri);
 
  try {
    const database = client.db('NikoG');
    const movies = database.collection('planner-data-collection');
    const movie = await movies.find({});
    console.log(movie);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }*/
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});


app.get('/get-schedule', async (req, res) => {
  const schedule = await getSchedule();

  res.status(200).json({      
      hours: hoursOfDay,
      days: daysOfWeek,
      schedule: await getSchedule()
    });
});

app.post('/update-schedule', async (req, res) => {
  //console.log(req.body)
  
  try {
    await Schedule.findByIdAndUpdate("655a9287e7484a47287c496a", req.body)
    res.status(200).send()
  } catch (err) {
    res.send(err);
  }

  

});










app.post('/generate-pdf', async (req, res) => {
  console.log(req.body)
  try {
    const generator = pdfGenerator();
    const pdfResult = await generator.generate(req.body.tableHTML);
    const fileName = "example.pdf"

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Length', pdfResult.length);
    res.send(pdfResult);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Internal Server Error');
  }
});

const pdfGenerator = () => {
  return {
    async generate(content) {
      const browser = await puppeteer.launch();

      const page = await browser.newPage();

      await page.goto("http://localhost:8080/about", { waitUntil: 'networkidle0' })
      await page.emulateMediaType('screen');
      //await page.setContent(content);

      const pdf = await page.pdf();
      await browser.close();

      return pdf;
    },
  };
};

mongoose.connect(uri);
main().catch(console.error);

app.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
})












