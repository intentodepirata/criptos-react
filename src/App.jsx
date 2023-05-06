import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Paper } from "@mui/material";
import ImagenCripto from "./assets/img/imagen-criptos.png";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner2 from "./components/Spinner2";

const App = () => {
  const [monedas, setMonedas] = useState({});
  const [cotizacion, setCotizacion] = useState({});
  const [cotizacionRaw, setCotizacionRaw] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCargando(true);
        setCotizacion({});
        const { cripto, moneda } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
        const response = await fetch(url);
        const data = await response.json();

        setCotizacion(data.DISPLAY[cripto][moneda]);
        setCotizacionRaw(data.RAW[cripto][moneda]);
        setCargando(false);
      };
      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "900px",
        margin: "0 auto",
        width: "90%",
      }}
    >
      <Box
        sx={{
          "@media (min-width: 992px)": {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "2rem",
          },
        }}
      >
        <Box
          sx={{
            maxWidth: "400px",
            width: "80%",
            margin: "100px auto 0 auto",
            display: "block",
          }}
          component="img"
          src={ImagenCripto}
          alt="IMAGEN CRIPTOMONEDAS"
        />
        <Paper sx={{ p: 2 }}>
          <Typography
            variant="h1"
            color="primary"
            sx={{
              fontFamily: "lato , sans-serif",
              textAlign: "center",
              fontWeight: "700px",
              mt: "80px",
              mb: "50px",
              fontSize: "34px",
              "&::after": {
                content: '""',
                width: "100px",
                height: "6px",
                bgcolor: "#66a2fe",
                display: "block",
                margin: "10px auto 0 auto",
              },
            }}
          >
            Cotiza criptomonedas al instante
          </Typography>
          <Formulario setMonedas={setMonedas} />
        </Paper>
      </Box>
      <Box>
        {cargando && <Spinner2 />}
        {cotizacion && cotizacion.PRICE && (
          <Resultado
            cotizacion={cotizacion}
            cotizacionRaw={cotizacionRaw}
            monedas={monedas}
          />
        )}
      </Box>
    </Box>
  );
};

export default App;
