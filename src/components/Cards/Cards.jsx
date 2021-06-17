import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import CardComponent from './Card/Card';
import styles from './Cards.module.css';

const Info = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return 'Loading...';
  }

  return (
    <div className={styles.container}>
        <Typography gutterBottom variant="h4" component="h2"></Typography>
      <Grid container spacing={3} justify="center">
        <CardComponent
          className={styles.infected}
          cardTitle="Infectados"
          value={confirmed.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Número de casos Infectados."
        />
        <CardComponent
          className={styles.recovered}
          cardTitle="Recuperados"
          value={recovered.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Número de casos Recuperados."
        />
        <CardComponent
          className={styles.deaths}
          cardTitle="Mortos"
          value={deaths.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Números de casos Mortos."
        />
      </Grid>
    </div>
  );
};

export default Info;
