import React from 'react';

const Grupo_descripcion = () => {
    const groupInfo = {
        name: "SEISMinds",
        description: "Un grupo interdisciplinario dedicado a la exploración de fenómenos geológicos y sismológicos en planetas y satélites. Trabajamos en proyectos innovadores que buscan entender mejor la actividad sísmica en Marte y la Luna.",
        members: [
            { name: "Helen Penagos", role: "Líder del equipo" },
            { name: "Jhon Bedoya", role: "Ingeniero de datos" },
            { name: "Valentina Rodriguez", role: "Analista de datos" },
            { name: "Juan David Duarte", role: "Ingeniero de sistemas" },
            { name: "Santiago Morales", role: "Ingeniero de sistemas" }
        ],
        projects: [
            "Análisis de sismos lunares y marcianos",
            "Desarrollo de modelos de predicción de actividad sísmica a través de redes neurales",
            "Exploración de nuevas técnicas de visualización de datos sísmicos"
        ]
    };

    return (
        <div style={{
            backgroundImage: 'url(//unpkg.com/three-globe/example/img/night-sky.png)', // Imagen de fondo
            backgroundSize: 'cover', // Asegura que la imagen cubra todo el fondo
            backgroundPosition: 'center', // Centra la imagen
            backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
            minHeight: 'calc(100vh - 56px)', // Altura menos el navbar fijo
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                background: 'linear-gradient(to bottom, #000407, #042431)',
                padding: '20px',
                borderRadius: '10px',
                maxWidth: '800px',
                margin: '0 auto',
                textAlign: 'center',
                color: 'white'
            }}>
                <h1 style={{
                    fontSize: '36px',
                    color: '#00c3ff',
                    marginBottom: '20px'
                }}>{groupInfo.name}</h1>

                <p style={{
                    fontSize: '18px',
                    color: '#c7d1da',
                    marginBottom: '30px'
                }}>{groupInfo.description}</p>

                <h2 style={{
                    fontSize: '28px',
                    color: '#66c2ff',
                    marginBottom: '10px'
                }}>Miembros del equipo</h2>

                <ul style={{
                    listStyleType: 'none',
                    padding: '0',
                    marginBottom: '30px'
                }}>
                    {groupInfo.members.map((member, index) => (
                        <li key={index} style={{
                            fontSize: '20px',
                            color: '#c7d1da',
                            marginBottom: '10px'
                        }}>
                            {member.name} - <span style={{ fontStyle: 'italic', color: '#a0b9cf' }}>{member.role}</span>
                        </li>
                    ))}
                </ul>

                <h2 style={{
                    fontSize: '28px',
                    color: '#66c2ff',
                    marginBottom: '10px'
                }}>Proyecto Actual</h2>

                <ul style={{
                    listStyleType: 'none',
                    padding: '0'
                }}>
                    {groupInfo.projects.map((project, index) => (
                        <li key={index} style={{
                            fontSize: '20px',
                            color: '#c7d1da',
                            marginBottom: '10px'
                        }}>
                            {project}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Grupo_descripcion;
