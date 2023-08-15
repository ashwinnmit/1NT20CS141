import React, { useState } from 'react';
import axios from 'axios';
import { List, ListItem } from '@mui/joy';
import { Button, Input } from '@mui/joy';

function GetData() {
  const [trainData, setTrainData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchTrainData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getData');
      setTrainData(response.data);
    } catch (error) {
      console.error('Error fetching train data:', error);
    }
  };

  const displayTrain = async () => {
    fetchTrainData();
    const filteredTrains = trainData.filter((train) => train.trainName === inputValue);
    filteredTrains.forEach((train) => {
      console.log(train.trainName);
    });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>Ashwin's Railway System</h1>
      <Input placeholder="Enter train name: " value={inputValue} onChange={handleInputChange} />
      <Button onClick={fetchTrainData}>Fetch Train Details</Button>
      <Button onClick={displayTrain}>Display Filtered Trains</Button>
      <List>
        {trainData.map((train) => (
          <List key={train.trainNumber}>
            <ListItem>
              Train Name: <b>{train.trainName} ({train.trainNumber})</b>
            </ListItem>
            <ListItem>Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}</ListItem>
            <ListItem>Seats Available (Sleeper): {train.seatsAvailable.sleeper}</ListItem>
            <ListItem>Price (Sleeper): {train.price.sleeper}</ListItem>
            <ListItem>Delay (in minutes): {train.delayedBy}</ListItem>
            <hr />
          </List>
        ))}
      </List>
    </div>
  );
}

export default GetData;
