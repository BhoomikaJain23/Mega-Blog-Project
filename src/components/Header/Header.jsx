import React from 'react';
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: 'Login', slug: "/login", active: !authStatus },
    { name: 'Signup', slug: "/signup", active: !authStatus },
    { name: 'All Posts', slug: "/all-posts", active: authStatus },
    { name: 'Add Post', slug: "./add-post", active: authStatus },
  ]

  return (
    <header className="sticky top-0 z-50 py-4 glass bg-gradient-to-r from-slate-900 to-slate-700 border-b border-slate-700/40">
      <Container>
        <nav className="flex items-center">
          <div className="mr-6">
            <Link to="/" className="transition-transform hover:scale-105">
              <Logo width="65px" />
            </Link>
          </div>

          <ul className="flex ml-auto gap-2 items-center">
            {navItems.map((item) => item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="inline-block px-4 py-2 duration-200 rounded-lg text-slate-100 hover:bg-slate-800/60 hover:text-white transition-colors font-medium"
                >
                  {item.name}
                </button>
              </li>
            ) : null)}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;