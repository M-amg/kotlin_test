import AppRoute from './app-route';
import './App.css';
import Header from './components/nave-menu';

function App() {
  return (
    <>
    <Header />
    <div className='bg-gray-100 py-10'>
      <div className="container mx-auto mt-10 md:container md:mx-auto lg:container lg:mx-auto">
        <AppRoute />
      </div>
    </div>
    </>
  );
}

export default App;
