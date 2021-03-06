import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logOutAC} from '../../redux/actionCreators/authAC';
import {useEffect} from 'react'
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css'
import './NavBar.css'
import logo from './logo.png'

function NavBar() {
    const deposit = useSelector(state => state.auth.currentUser.deposit)
    const user = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()
    const logOut = (event) => {
        event.preventDefault()
        dispatch(logOutAC())
        history.push('/')
    }

    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function() {
            let elems = document.querySelectorAll('.sidenav');
            let instances = M.Sidenav.init(elems, {});
        });
    }, []);

    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <img src={logo} style={{width:"50px", height:"50px", marginTop:"6px", marginRight:"10px"}}/>
                    <Link to='/' style={{fontWeight:"bolder"}} className="brand-logo">Toffee</Link>

                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i
                        className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                                {user.isLogged ? (
                                    <>
                                        <li style={{fontSize: "30px", padding:"0px 15px"}}>
                                            Свободные средства: {Number(deposit).toFixed(2)} USD
                                        </li>
                                        <li style={{fontSize: "30px", padding:"0px 15px"}}>
                                            <Link to='/update'>Изменить данные профиля</Link>
                                        </li>
                                        <li style={{fontSize: "30px", padding:"0px 15px"}}>
                                            <Link to="/riskpage">
                                                Расчет риска
                                            </Link>
                                        </li>
                                        <li style={{fontSize: "30px", padding:"0px 15px"}}>
                                            <Link to="/dashboard">
                                                Профиль
                                            </Link>
                                        </li>
                                        <li style={{fontSize: "30px", padding:"0px 15px"}}>
                                            <Link to={"/"} onClick={logOut}>
                                                Выйти
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <Link to="/auth" className="enter">
                                            Войти
                                        </Link>
                                    </li>
                                )}
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                    {user.isLogged ? (
                        <>
                            <li className="sidenav-li">
                                <Link to='/update'>Изменить профайл</Link>
                            </li>
                            <li className="sidenav-li">
                                <Link to="/riskpage" className="">
                                    Расчет риска
                                </Link>
                            </li>
                            <li className="sidenav-li">
                                <Link to="/dashboard"  className="">
                                    Профиль
                                </Link>
                            </li>
                            <li className="sidenav-li">
                                <Link to={"/"} onClick={logOut} className="">
                                    Выйти
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/auth" className="">
                                Войти
                            </Link>
                        </li>
                    )}
            </ul>
        </>
    );
}

export default NavBar;
