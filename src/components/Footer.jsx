import githubLogo from "../assets/github-logo.png";

function Footer() {
  return (
    <footer className="footer">
      <a
        href="https://github.com/andresgonzalezperez/liner-notes-app-frontend.git"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        <img src={githubLogo} alt="GitHub" className="footer-github-logo" />
        <span className="footer-text">Created by: Andrés González</span>
      </a>
    </footer>
  );
}

export default Footer;