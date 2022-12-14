const express = require('express');
const app = express();
app.use(express.json());

const morgan = require('morgan');
app.use(morgan('dev'));

// app.get('/', (req, res) => {
//   res.send('HI');
// });

//middleware
app.use((req, res, next) => {
  console.log('Middlewware has started');
  next();
});

app.use((req, res, next) => {
  req.Time = new Date().toISOString();
  next();
});
//APIS
const fs = require('fs');

const x = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    newTime: req.Time,
    status: 'success',
    results: x.length,
    data: {
      tours: x,
    },
  });
});

//urls
app.get('/api/v1/tours/:Id', (req, res) => {
  const Id = req.params.Id * 1;
  const tour = x.find((el) => el.id === Id);

  if (!tour) {
    return res.status(404).json({
      status: 'Failure',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

//users

const useRroute = express.Router();

const getallusers = (req, res) => {
  res.status(404).json({
    status: 'getusers',
    message: 'not a valide one',
  });
};

const createusers = (req, res) => {
  res.status(404).json({
    status: 'getusers',
    message: 'not a valide one',
  });
};

const getuser = (req, res) => {
  res.status(404).json({
    status: 'getusers',
    message: 'not a valide one',
  });
};

const updateuser = (req, res) => {
  res.status(404).json({
    status: 'getusers',
    message: 'not a valide one',
  });
};

const deleteuser = (req, res) => {
  res.status(404).json({
    status: 'getusers',
    message: 'not a valide one',
  });
};

useRroute.route('/').get(getallusers).post(createusers);

useRroute.route('/:Id').get(getuser).patch(updateuser).delete(deleteuser);

app.use('/api/v1/users', useRroute);

//patch

// app.patch('/api/v1/tours/:Id', (req, res) => {
//   if (req.params.Id * 1 > x.length) {
//     return res.status(404).json({
//       status: 'Failure',
//     });
//   }

//   res.status(200).json({});
// });

// app.post('/api/v1/tours', (req, res) => {
//   //   console.log(req.body);

//   const newid = x[x.length - 1].id + 1;
//   const newTour = Object.assign({ id: newid }, req.body);

//   x.push(newTour);

//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(x),
//     (err) => {
//       console.log(err);
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: x,
//         },
//       });
//     }
//   );
// });

app.listen(6000, () => {
  console.log('started');
});
