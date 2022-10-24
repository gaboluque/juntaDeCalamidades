import { Header } from "./header";
import { useMemo, useState } from "react";
import { PixelBoard } from "../PixelBoard";
import { Chat } from "./chat";
import { Book } from "../Book";


const ChatRoom = ({ messages, handleSendMessage, username, board, onPixelClick, pixelColor }) => {
  const [tab, setTab] = useState("chat");

  const Component = useMemo(() => {
    if (tab === "chat") {
      return <Chat messages={messages} username={username} onSubmit={handleSendMessage}/>
    }
    if (tab === "board") {
      return <PixelBoard pixelColor={pixelColor} board={board} onPixelClick={onPixelClick}/>
    }
    if (tab === "book") {
      return <Book/>
    }
    if (tab === "manifest") {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white mb-14">Manifesto</h1>
          <p className="text-white text-2xl text-center p-2">
            “Tan grande como mis fracasos”, llegue a esta frase en mi incesante búsqueda por comenzar el tratado de mis fracasos, para hablar de mi culpa, de mi dolor, la ansiedad y el estrés que deterioran mi cabeza. El fracaso para muchos es no estar preparado, personalmente, rara vez me siento preparado para algo, la vida del inepto, mi funcionar no cabe entre los límites de la doctrina del éxito, con el tiempo me di cuenta que no soy el único, yo y mis compañeros crecimos rotos, estamos deteriorados pero aun así lo vemos como nuestro estado natural, sociedad de mártires defectuosos, o errantes desdichados, la depresión pan de cada día, y una leve hedor a desesperanza puede olerse por toda la ciudad de Bogotá.
            <br/>
            <br/>
            Almas rotas, danzamos al son de los ídolos falsos y la gloria de la institución que nos valida, cruda selección natural contemporánea, la supervivencia del más obediente, del más apetecible, sin duda seguimos siendo animales, condenados a ser conscientes de la futilidad de su existencia. Destruir, sanar, fracasar, quiero darme el egoísta poder de sanarme y a los demás, de darle un espacio a los desdichados, a los que nos sentimos incapaces de seguir el ritmo a la monstruosa bestia que es el éxito, no volveré a creer en lo puro ni lo sagrado, no glorificare los fantasmas del canon que conquistaron nuestras cabezas cuando éramos más inocentes y vulnerables.
            <br/>
            <br/>
            Levantare un estandarte a mis defectos, aceptare los demonios de la ira, la tristeza, y todas las sensaciones prohibidas confinadas al cubo psiquiátrico y los fármacos, ya no soy mi enemigo, gritare la oda a lo roto, a lo manchado, lo desalineado, caótico, seré una calamidad, una infinidad de posibilidades que no caben en su idea de éxito. El fracaso ya no responde a una dualidad contenida en la noción convencional de moralidad, es una apertura a la posibilidad de validarme en mis propios términos. Ya no hay medallas y coronas que signifiquen más que la decadencia del autocuidado, el éxito es esa utopía que no existe, una trampa engañosa, ciclo absurdo de desgaste eterno. Súcubos de energía y tiempo, nos mantienen cansados y confundidos, ritmo infernal, habitamos esta ciudad llena de desconfianza, lugar colectivo de sufrimiento, tenemos que encontrar nuestro santuario entre los grises andenes y las mentes parasitadas por la tradición. Quien más que nosotros mismos para ser los policías de nuestros propios rumbos, no sé en qué momento me enseñaron a tener culpa por mi mente, mi cuerpo, mis ideales y mi propio existir, pena absurda por ser yo.
            <br/>
            <br/>
            Nos agotaron las ganas de ser gentiles con nosotros mismos, nos enseñaron que la salida es el entretenimiento azucarado y no soy nada sin los estímulos rápidos y vacíos que me mantienen cuerdo, exceso de pasiones fugaces, Sam Fisher lo llamo la “depresión hedonista”, dejo mi sanidad a cualquier estímulo externo que me valide, que me contente, que me tenga dopado y fuera de mi mismo, que sea sencillo no como existir. Extranjero a mi propia existencia.
            <br/>
            <br/>
            Cuando le vi la cara a la muerte me di cuenta que todo me puede ser arrebatado menos mis fracasos, son míos y de nadie más, nadie los va a querer más que yo. Soy humano porque erro, nómada, estoy cansado de ser sedentario en cuerpo y pensamiento. O dios del fracaso, rey fracaso, enséñame a dudar, enséñame a sanar y pararme con mis propias piernas, a ser consciente de mi existir y encontrar una levedad en la compleja y fútil existencia que se me fue otorgada por el azar universal, dejar las prótesis emocionales que dan la impresión de mantenerme en pie, O rey fracaso quiero encontrar algo de misericordia para mí mismo.
            <br/>
            <br/>
            Almas rotas ahora danzamos alrededor del rey fracaso, al calor de la hoguera de nuestras derrotas. Aquí tiene espacio lo otro, lo prohibido, no creemos en lo puro, ganadores, perdedores todos estamos rotos y respondemos a los mismos fantasmas, ahora sabemos que el futuro es incierto y nuestra existencia es fútil y por eso mismo somos tan libres como queramos, igual todos seremos olvidados inevitablemente. He visto el deterioro de mi mismo y de mis más cercanos compañeros, el borde de la cornisa, el metal frío contra la muñeca, los cócteles letales, somos mas de uno que necesitamos un espacio donde sanar, es una necesidad encontrar alguna salida al recto camino del buen ciudadano, del ser productivo y eficiente.
            <br/>
            <br/>
            Reuniendo algo de valor quiero darnos un nombre, una identidad a nosotros que estamos rotos y no encajamos.
            <br/>
            <br/>
            Usar mi grafica para un fin más allá de mi fría quietud y ojalá también cambiarla en el proceso, desaprender, destruir para poder crear, disolver y coagular. No pretendo destruir las consignas sociales que gobiernan nuestros cuerpos, pero ojalá pueda proponer una salida desde sus mismas lógicas, resiliencia, cuidado, gentileza, es momento de dejar atrás ideas podridas como el canon, el éxito, lo puro, lo bello, lo verdadero. Mi tristeza es más allá de un síntoma, es una huelga, un grito y tiene lugar en mi cabeza con todos mis otros diablillos, soy más que los éxitos vacíos, las buenas notas y el dinero que escupen por mi tiempo.
            <br/>
            <br/>
            Soy un fracasado, estoy roto, mis grietas son mis tatuajes y hacen de mi incalculable, indomable.
            <br/>
            <br/>
            Soy fracaso, soy infinito, soy posibilidad
            <br/>
            <br/>
            Extranjero ya no a mi mismo si no al margen del éxito y la quimera absurda del progreso contemporáneo, no existo para alimentar egos ni para ser una cifra más, voy a ser calamidad, debo resignificar el éxito, que ya no decidan sobre mí las manos frías de la institución, quiero escapar de este hedor a hierro que me persigue desde joven.
            <br/>
            <br/>
            No hay salidas porque nunca se nos plantearon, y de chiquitos solo debemos llenar expectativas ajenas, siempre a ser otro, tener ídolos, gloria al ganador, al que se rinde ante la institución, al que se adapta, desde un inicio nos quitaron las ganas de vencer. Muerte a los ídolos falsos, ajenos a nosotros, a los modelos a seguir, el humano hecho objeto de consumo, y la existencia cuantificable que nos convencen es nuestra única realidad.
            <br/>
            <br/>
            El derrotado no tiene lugar, no tiene identidad, no tiene habla ni presencia, se nos despojó de todo y así mismo, tenemos la posibilidad de hacer nuestro propio mito, izar la bandera de lo impuro y conquistar lo que nos venga en gana, todo fracasa, todo se pudre, todo en algún momento se vuelve falente, no le tenemos miedo al olvido, y nuestro lugar no conoce márgenes.
            <br/>
            <br/>
            Unir, destruir y luego sanar.
          </p>
        </div>
      )
    }
  }, [tab, messages]);


  return (
    <div id="chatRoom" className="flex-1 p:2 sm:p-6 justify-between flex flex-col">
      <Header selected={tab} handleTab={setTab}/>
      {Component}
    </div>
  );
};

ChatRoom.defaultProps = {};


export default ChatRoom;