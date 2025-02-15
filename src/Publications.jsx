import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import DOMPurify from 'dompurify';

const Publications = ({ year }) => {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('./papers.yaml');
      const yamlData = yaml.load(result.data);
      setPapers(yamlData.papers);
    };

    fetchData();
  }, []);

  const filteredPapers = papers.filter(paper => paper.paper_year === year);

  return (
    <>
      <h3> {year} </h3>
      <ul className="papers" id={ `year${ year }` } >
        {filteredPapers.map((paper) => (
          <Paper key={paper.paper_id} paper={paper} />
        ))}
      </ul>
    </>
  );
};

const Paper = ({ paper }) => {
  const [showAbstract, setShowAbstract] = useState(false);
  const [showBibtex, setShowBibtex] = useState(false);
  const paper_link_entries = Object.entries(paper.paper_links)
  const sanitizedAbstract = DOMPurify.sanitize(paper.paper_abstract);

  return (
    <li className="paper" id={paper.paper_id} key={paper.paper_id}>
      <div className="paper_title should_inline">
        {paper.paper_title}
        {paper.paper_award && (
          <span className="paper_award">
              {paper.paper_award.link.startsWith("http")
                ? (<a href={paper.paper_award.link} target="_blank" rel="noopener noreferrer">{paper.paper_award.award}</a>)
                : (<a href={paper.paper_award.link}>{paper.paper_award.award}</a>)
              }
          </span>
        )}
      </div>
      <div className="paper_author">
        {paper.paper_author.join(', ')}
      </div>
      <div className="paper_venue">
        {paper.paper_venue.conference && (
          <div className="paper_conference">
            Conference: {paper.paper_venue.conference}
          </div>
        )}
        {paper.paper_venue.journal && (
          <div className="paper_journal">
            Journal: {paper.paper_venue.journal}
          </div>
        )}
        {paper.paper_venue.book_chapter && (
          <div className="book_chapter">
            Book Chapter: {paper.paper_venue.book_chapter}
          </div>
        )}
        {paper.paper_venue.thesis && (
          <div className="paper_thesis">
            Ph.D. Thesis: {paper.paper_venue.thesis}
          </div>
        )}
      </div>
      <div className="paper_links">
        <ul>
          <li onClick={() => setShowAbstract(!showAbstract)}>
            <a className={showAbstract ? "toggle_on" : "toggle_off"}>Abstract</a>
          </li>
          <li onClick={() => setShowBibtex(!showBibtex)}>
            <a className={showBibtex ? "toggle_on" : "toggle_off"}>bibtex</a>
          </li>
          {paper_link_entries.map(([key, value], index) => (
            <li key={index} className={index == paper_link_entries.length-1 ? 'last' : ''}>
              { key=="videos"
                  && <span>
                        videos [{ value.map((url,idx) => (
                          <React.Fragment key={idx}>
                            <a href={url}>{idx+1}</a>
                            { idx < value.length-1 && ","}
                          </React.Fragment>
                        ))}]
                     </span>
                  || <a href={value}>{key}</a>
              }
            </li>
          ))}
        </ul>
      </div>
      {showAbstract && (
        <div className="paper_abstract">
          <p dangerouslySetInnerHTML={{ __html: sanitizedAbstract }} />
        </div>
      )}
      {showBibtex && (
        <div className="paper_bibtex">
          <pre>{paper.paper_bibtex}</pre>
        </div>
      )}
    </li>
  );
};

export default Publications;
