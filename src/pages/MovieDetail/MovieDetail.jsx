import './index.scss'
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MovieService } from "../../api/MovieService";

const MovieDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [videos, setVideos] = useState([]);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  async function getMovie() {
    try {
      setLoading(true);
      const data = await MovieService.getMovieDetails(id);
      setMovie(data);
      setCredits(data.credits);
    } catch (error) {
      setError('Erro ao carregar detalhes do filme');
    } finally {
      setLoading(false);
    }
  }

  async function getMovieVideos() {
    try {
      const videos = await MovieService.getMovieVideos(id);
      setVideos(videos);
    } catch (error) {
      console.error("Erro ao buscar vídeos do filme:", error);
      setVideos([]);
    }
  }


  useEffect(() => {
    getMovie();
    getMovieVideos();
  }, [id]);

  function formatarDataBrasileira(data) {
    const dataObjeto = new Date(data);
    const dia = dataObjeto.getDate().toString().padStart(2, '0');
    const mes = (dataObjeto.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObjeto.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  function formatarNumero(Flutuante) {
    return parseFloat(Flutuante).toFixed(1);
  }

  function converterSiglaParaNomeLingua(sigla) {
    const mapeamentoSiglasNomes = {
      en: 'Inglês',
      es: 'Espanhol',
      fr: 'Francês',
      de: 'Alemão',
      it: 'Italiano',
      ja: 'Japonês',
      'zh-CN': 'Chinês (Mandarim)',
      'zh-TW': 'Chinês (Taiwanês)',
      hi: 'Hindi',
      ru: 'Russo',
      ko: 'Coreano',
      ar: 'Árabe',
      pt: 'Português',
      sv: 'Sueco',
      nl: 'Holandês',
      tr: 'Turco',
      el: 'Grego',
      th: 'Tailandês',
      he: 'Hebraico',
      da: 'Dinamarquês',
      no: 'Norueguês',
      fi: 'Finlandês',
      pl: 'Polonês',
      hu: 'Húngaro',
      cs: 'Tcheco',
      ro: 'Romeno',
      fa: 'Persa',
      bn: 'Bengali',
      mr: 'Marathi',
      te: 'Telugu',
      kn: 'Kannada',
    };

    return mapeamentoSiglasNomes[sigla] || 'Desconhecido';
  }

  const orcamentoFormatado = movie.budget ? `R$ ${movie.budget.toLocaleString('pt-BR')}` : 'N/A';

  const handleGenreClick = (genreId) => {
    navigate('/', { state: { filterType: 'genre', value: genreId } });
  };

  const handleActorClick = async (actor) => {
    navigate('/', { 
      state: { 
        filterType: 'actor', 
        value: actor.id,
        actorName: actor.name 
      } 
    });
  };

  const handleCrewClick = (crewMember) => {
    navigate('/', { 
      state: { 
        filterType: 'crew', 
        value: crewMember.id,
        crewName: crewMember.name,
        crewJob: crewMember.job
      } 
    });
  };

  const handleCompanyClick = (company) => {
    navigate('/', { 
      state: { 
        filterType: 'company', 
        value: company.id,
        companyName: company.name
      } 
    });
  };

  const renderVideoEmbed = (video) => {
    const { site, key } = video;
    
    switch (site.toLowerCase()) {
      case 'youtube':
        return (
          <iframe
            src={`https://www.youtube.com/embed/${key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      
      case 'vimeo':
        return (
          <iframe
            src={`https://player.vimeo.com/video/${key}`}
            title="Vimeo video player"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        );
      
      case 'dailymotion':
        return (
          <iframe
            src={`https://www.dailymotion.com/embed/video/${key}`}
            title="Dailymotion video player"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="MovieDetail">
      {loading ? (
        <div className="loading-spinner">Carregando...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="MovieDetail__container">
            <div className="MovieDetail__header">
              <Link to={"/"} className="MovieDetail__button">
                Voltar
              </Link>
              <div className="MovieDetail__image">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                />
              </div>
            </div>

            <div className="MovieDetail__basic-info">
              <h1 className="MovieDetail__title">{movie.title}</h1>
              
              {movie.tagline && (
                <div className="MovieDetail__tagline">
                  "{movie.tagline}"
                </div>
              )}
              
              <div className="MovieDetail__genres">
                {movie.genres?.map(genre => (
                  <span 
                    key={genre.id} 
                    className="genre-tag"
                    onClick={() => handleGenreClick(genre.id)}
                    role="button"
                    tabIndex={0}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="MovieDetail__overview">
                <div className="MovieDetail__overview-title">Sinopse</div>
                <p>{movie.overview || 'Sinopse não disponível.'}</p>
              </div>
            </div>

            {/* Grid de Informações Técnicas */}
            <div className="MovieDetail__technical-info">
              <h2>Informações Técnicas</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span>Duração:</span> 
                  {movie.runtime ? `${Math.floor(movie.runtime/60)}h ${movie.runtime%60}min` : 'N/A'}
                </div>
                <div className="info-item">
                  <span>Orçamento:</span> {orcamentoFormatado}
                </div>
                <div className="info-item">
                  <span>Receita:</span> 
                  {movie.revenue ? `R$ ${movie.revenue.toLocaleString('pt-BR')}` : 'N/A'}
                </div>
                <div className="info-item">
                  <span>Lucro:</span> 
                  {movie.revenue && movie.budget ? 
                    `R$ ${(movie.revenue - movie.budget).toLocaleString('pt-BR')}` : 'N/A'}
                </div>
                <div className="info-item">
                  <span>Data de Lançamento:</span> {formatarDataBrasileira(movie.release_date)}
                </div>
                <div className="info-item">
                  <span>Língua Original:</span> {converterSiglaParaNomeLingua(movie.original_language)}
                </div>
                <div className="info-item">
                  <span>Popularidade:</span> {formatarNumero(movie.popularity)}
                </div>
                <div className="info-item">
                  <span>Avaliação:</span> {formatarNumero(movie.vote_average)}/10
                </div>
              </div>
            </div>

            {/* Elenco e Equipe */}
            <div className="MovieDetail__people">
              {/* Elenco Principal */}
              <div className="MovieDetail__cast">
                <h2>Elenco Principal</h2>
                <div className="cast-list">
                  {credits.cast?.slice(0, 4).map((actor) => (
                    <div 
                      key={actor.id} 
                      className="cast-item"
                      onClick={() => handleActorClick(actor)}
                      role="button"
                      tabIndex={0}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w154${actor.profile_path}`}
                        alt={actor.name}
                        onError={(e) => {
                          e.target.src = '/placeholder-actor.png';
                        }}
                      />
                      <h3>{actor.name}</h3>
                      <p>{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipe Técnica */}
              <div className="MovieDetail__crew">
                <h2>Equipe Técnica</h2>
                <div className="crew-list">
                  {credits.crew?.filter(person => 
                    ['Director', 'Producer', 'Screenplay'].includes(person.job)
                  ).map(person => (
                    <div 
                      key={person.id} 
                      className="crew-item"
                      onClick={() => handleCrewClick(person)}
                      role="button"
                      tabIndex={0}
                    >
                      <span className="crew-job">{person.job}:</span>
                      <span className="crew-name">{person.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Produção e Links */}
            <div className="MovieDetail__footer">
              {/* Produtoras com logos menores */}
              <div className="MovieDetail__production">
                <h2>Produção</h2>
                <div className="production-companies">
                  {movie.production_companies?.map(company => (
                    <div 
                      key={company.id} 
                      className="company-item"
                      onClick={() => handleCompanyClick(company)}
                      role="button"
                      tabIndex={0}
                    >
                      {company.logo_path && (
                        <img 
                          src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                          alt={company.name}
                        />
                      )}
                      <span>{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links Externos */}
              <div className="MovieDetail__external-links">
                {movie.homepage && (
                  <a 
                    href={movie.homepage} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="external-link"
                  >
                    Site Oficial
                  </a>
                )}
                {movie.imdb_id && (
                  <a 
                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="external-link"
                  >
                    IMDB
                  </a>
                )}
              </div>
            </div>

            {/* Vídeos */}
            <div className="MovieDetail__videos">
              <h2>Trailers e Vídeos</h2>
              <div className="video-grid">
                {Array.isArray(videos) && videos.length > 0 ? (
                  videos.slice(0, 4).map((video) => (
                    <div key={video.id} className="video-wrapper">
                      {renderVideoEmbed(video)}
                      <p className="video-title">{video.name}</p>
                      <span className="video-type">{video.type}</span>
                    </div>
                  ))
                ) : (
                  <p className="no-videos">Nenhum vídeo disponível</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MovieDetail;