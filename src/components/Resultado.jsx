import { Box, Typography } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import darkUnica from "highcharts/themes/dark-unica";

const Resultado = ({ cotizacion, cotizacionRaw, monedas }) => {
  const { PRICE, LOWDAY, HIGHDAY, IMAGEURL, LASTUPDATE, CHANGEPCT24HOUR } =
    cotizacion;

  //activar para modo oscuro
  // darkUnica(Highcharts);
  const options = {
    title: {
      text: ` Precio de ${monedas.cripto}`,
    },
    xAxis: {
      categories: ["Precio", "Máximo de hoy", "Mínimo de hoy"],
    },
    yAxis: {
      title: {
        text: `Precio ${monedas.moneda}`,
      },
    },
    series: [
      {
        name: "Ocultar",
        data: [
          {
            y: cotizacionRaw.PRICE,
            dataLabels: {
              enabled: true,
              format: "Precio: {y}",
            },
          },
          {
            y: cotizacionRaw.HIGHDAY,
            dataLabels: {
              enabled: true,
              format: "Máximo (24h): {y}",
            },
          },
          {
            y: cotizacionRaw.LOWDAY,
            dataLabels: {
              enabled: true,
              format: "Mínimo (24h): {y}",
            },
          },
        ],
        type: "column",
      },
    ],
    subtitle: {
      text: `Última actualización: ${LASTUPDATE}`,
    },
    credits: {
      enabled: false,
    },
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          mt: 2,
          p: 2,
          "@media (min-width: 992px)": {
            display: "flex",
            flexDirection: "row",
          },
        }}
      >
        <Box sx={{ pt: 2, maxWidth: "600px", width: "90%" }}>
          {cotizacion && cotizacion.PRICE && (
            <HighchartsReact highcharts={Highcharts} options={options} />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            {" "}
            <Box
              component="img"
              src={`https://cryptocompare.com/${IMAGEURL}`}
              sx={{ width: "20%", mr: 1 }}
            />
            <Typography variant="h4" color="black">
              {monedas.cripto}
            </Typography>
          </Box>
          <Box sx={{ ml: 6 }}>
            <Typography variant="h6" color="grey">
              Precio:{" "}
              <Box sx={{ fontWeight: "700" }} component="span">
                {PRICE}
              </Box>
            </Typography>
            <Typography variant="body1" color="grey">
              Maximo de hoy:{" "}
              <Box sx={{ fontWeight: "700" }} component="span">
                {HIGHDAY}
              </Box>
            </Typography>
            <Typography variant="body1" color="grey">
              Minimo de hoy:{" "}
              <Box sx={{ fontWeight: "700" }} component="span">
                {LOWDAY}
              </Box>
            </Typography>
            <Typography variant="body1" color="grey">
              Variacion de hoy:{" "}
              <Box sx={{ fontWeight: "700" }} component="span">
                {CHANGEPCT24HOUR}
              </Box>
            </Typography>
            <Typography variant="body1" color="grey">
              Ultima Actualizacion:{" "}
              <Box sx={{ fontWeight: "700" }} component="span">
                {LASTUPDATE}
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Resultado;
