import './App.css'
import Publications from './Publications.jsx';

function App() {
  const publication_years = [
    2024, 2022, 2021, 2020, 
    2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 
    2009, 2008, 2004];

  return (
    <>
      <div className="publications_section"> 
        <h2 id="publications">Publications</h2>
        { publication_years.map( (year) => (
          <Publications key={year} year={year} />
        ))}
      </div>
    </>
  )
}

export default App
