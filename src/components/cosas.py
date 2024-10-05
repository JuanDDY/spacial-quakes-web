import obspy
import pandas as pd  # Asegúrate de importar pandas

# Leer archivo .mseed
stream = obspy.read("C:/Users/surface/talleres/nasa/spacial-earthquakes/public/dataProvisional/complete_stream.mseed")

# Convertir el contenido a un DataFrame (pandas)
data = stream[0].times('timestamp')  # obtener los tiempos
values = stream[0].data  # obtener los valores de amplitud
df = pd.DataFrame({'time': data, 'amplitude': values})

# Guardar como CSV
df.to_csv("C:/Users/surface/talleres/nasa/spacial-earthquakes/public/dataProvisional/pruebas1.csv", index=False)