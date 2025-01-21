import { signOut } from 'firebase/auth';
import estilos from '../styles/ejercicios.module.css'
import { auth } from '../config/firebase';
import { NavLink } from 'react-router-dom';


const Ejercicios = () => {

    const usuarioActual = auth.currentUser.email;

    const cerrarSesion = async () => {
        await signOut(auth);
        console.log('Sesion Cerrada')
    }

    const editarRegistro = () => {
        console.log('Editando Registro')
    }

    const borrarRegistro = () => {
        console.log('Borrando Registro')
        const today = new Date();
        console.log(today)
    }

    return (
        <>
            <header className={estilos.header}>
                <h3 className={estilos.usuarioActual}> Usuario: {usuarioActual}</h3>
                <button onClick={cerrarSesion} >Cerrar Sesion</button>
            </header>
            <div className={estilos.rutinaDiaria} >
                <NavLink to={'/rutinas-diarias'}><button>Mi rutina de hoy</button></NavLink> 
            </div>
            <div className={estilos.ejerciciosContainer}>
                <div className={estilos.wraper}>
                    <h2>Mis Ejercicios:</h2>

                </div>
                <table>
                    <thead>
                        <tr className={estilos.encabezados} >
                            <th>Fecha</th>
                            <th>Flexiones</th>
                            <th>Dominadas</th>
                            <th>Sentadillas</th>
                            <th>Abdominales</th>
                            <th>Observaciones</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={estilos.tbody}>
                        <tr className={estilos.cuerpo}>
                            <td>09/01/2025</td>
                            <td>30</td>
                            <td>20</td>
                            <td>20</td>
                            <td>15</td>
                            <td className={estilos.observaciones} >lorem*4</td>
                            <td>
                                <span className={estilos.edit} onClick={editarRegistro}>Editar</span>
                                /
                                <span className={estilos.delete} onClick={borrarRegistro} >Eliminar</span>
                            </td>
                        </tr>
                        <tr className={estilos.cuerpo} >
                            <td>11/01/2025</td>
                            <td>20</td>
                            <td>30</td>
                            <td>40</td>
                            <td>15</td>
                            <td></td>
                            <td>
                                <span className={estilos.edit} onClick={editarRegistro} >Editar</span>
                                /
                                <span className={estilos.delete} onClick={borrarRegistro} >Eliminar</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem enim tenetur accusantium laudantium nisi placeat et incidunt? Aliquid vitae beatae, corrupti, pariatur, quo sapiente illo dignissimos dolorem ex tempora voluptatum!
            Dolores rerum maiores consectetur odit obcaecati, quam atque a id culpa delectus veritatis laudantium eligendi reprehenderit enim quod excepturi sunt esse libero, nesciunt ullam? Non quod inventore molestiae sequi ipsam!
            Autem commodi, temporibus facere blanditiis inventore quam accusantium, in nam consequuntur eius odio architecto sequi iure nostrum ab tempora deserunt, sint odit officia maiores ipsum iusto eveniet. Deleniti, a sequi!
            Quam sed expedita animi optio, quisquam facere nisi ipsa natus quis perferendis, cumque sit, autem enim doloremque alias corporis minus aspernatur provident recusandae. Quos eligendi ad perferendis repellat ea ratione.
            Dolore, ipsam assumenda accusamus labore ratione perspiciatis consectetur saepe, cum similique, debitis veritatis. Corrupti, tenetur explicabo dignissimos, qui, illo sit fugit sint molestiae non natus quam quia quos repellendus numquam.
            Maxime alias possimus voluptas est expedita illo suscipit odit aperiam, repudiandae vel ad omnis accusamus ut? Facere, quo deserunt quis aperiam, commodi minus exercitationem accusantium, dolorum vel voluptatum vero id!
            Excepturi similique iste, nihil placeat quo eveniet? Iste quisquam id possimus minima tenetur repudiandae eos itaque atque soluta adipisci ea assumenda quasi natus nihil corrupti explicabo blanditiis, sed laudantium cumque?
            Repellendus esse nostrum amet laborum illum sint pariatur totam consequatur ducimus ipsa praesentium iste eveniet a eos nulla, cum odit illo alias ipsum veniam optio minima sapiente! Eveniet, eius natus?
            Maxime pariatur quos veritatis dolorum at officiis eum magnam, aliquam molestias voluptatem rem animi? Ipsam ducimus veritatis cumque autem eaque temporibus amet aliquid quia nulla? Commodi necessitatibus labore neque vel.
            Quo rerum temporibus, consequatur similique fuga obcaecati, atque nisi exercitationem quibusdam laboriosam quas eligendi maxime est provident consectetur aliquid quia deleniti quos veniam vel explicabo earum ex dolores perferendis! Sapiente.
            Odio optio accusantium distinctio non corporis consectetur est nam facere iste, ut laudantium molestiae, voluptatem voluptatum quos libero placeat. Ipsam rerum assumenda ratione temporibus doloribus quos, earum architecto pariatur dolore.
            Tempora eligendi quisquam inventore exercitationem nesciunt nam dolorum dolor magnam repudiandae ratione aut, veniam ullam tempore eveniet maxime, error cumque. Optio aliquid vero sequi consequuntur perferendis fugiat in nobis eum.
            Cupiditate ab vitae ducimus reiciendis. Fugiat nesciunt veniam perspiciatis at explicabo sit cum iste corporis est excepturi, reiciendis accusantium eligendi ex laborum ut veritatis totam magnam atque aut facere aliquid!
            Ratione, ducimus ex amet, quisquam doloribus qui illo at dolorem sunt molestiae porro quidem accusantium soluta officiis temporibus. Ipsa nemo aliquid, consequuntur totam quas sit optio accusamus architecto consequatur alias.
            Aliquam adipisci molestias itaque nemo error eveniet eius, quae ducimus, maiores illo voluptatem facere nam nesciunt minus possimus doloremque sunt perferendis modi dolor totam cum expedita. Quidem quam temporibus optio.
            Repudiandae officiis, commodi accusamus id accusantium obcaecati recusandae quas? Soluta provident illum, iste, nisi blanditiis, minima pariatur id excepturi voluptatem dolore architecto enim doloribus debitis facilis tenetur possimus nulla voluptas!
            Aperiam, incidunt tempore maxime, excepturi, vel facilis provident rem repellat fugiat eum saepe? Consequuntur accusantium dolorem autem laboriosam rem! Corporis possimus quas blanditiis. Quae tenetur dolor at, corporis blanditiis excepturi.
            Repudiandae magni sed officia praesentium quam consequatur! Quia obcaecati vitae eaque temporibus eos officia, ab labore ducimus quisquam consequatur odio laboriosam harum aut voluptas possimus quidem in nemo, dolores autem!
            Ad, veniam repellendus aliquam expedita dignissimos corrupti culpa quod, dolor perspiciatis maiores quisquam ducimus perferendis aspernatur neque eaque, facilis voluptatem optio odio doloribus est esse itaque? Non perspiciatis molestias labore.
            Doloremque eius nesciunt dolor est sunt. Quisquam amet tenetur a totam quia voluptate libero nam assumenda corporis maiores explicabo non, illo dolorem voluptates delectus expedita et labore autem sed consequuntur?</p>
        </>
    )
}

export default Ejercicios
