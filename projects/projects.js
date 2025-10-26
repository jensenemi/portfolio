import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

(async () => {
    const projects = await fetchJSON('../lib/projects.json');
    const projectsContainer = document.querySelector('.projects');
    const projectsTitle = document.querySelector('.projects-title');
    const searchInput = document.querySelector('.searchBar');

    renderProjects(projects, projectsContainer, 'h2');
    if (projectsTitle) {
        projectsTitle.textContent = `${projects.length} Projects`;
    }

    function renderPieChart(projectsGiven) {
        let newRolledData = d3.rollups(
            projectsGiven,
            (v) => v.length,
            (d) => d.year,
        );
        let newData = newRolledData.map(([year, count]) => {
            return { value: count, label: year };
        });
        let newSVG = d3.select('svg');
        newSVG.selectAll('path').remove();
        let legend = d3.select('.legend');
        legend.selectAll('*').remove();

        let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
        let sliceGenerator = d3.pie().value((d) => d.value);
        let arcData = sliceGenerator(newData);
        let arcs = arcData.map((d) => arcGenerator(d));

        let colors = d3.scaleOrdinal(d3.schemeTableau10);
        arcs.forEach((arc, idx) => {
            newSVG.append('path').attr('d', arc).attr('fill', colors(idx));
        });

        newData.forEach((d, idx) => {
            legend
                .append('li')
                .attr('class', 'legend-item') 
                .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
                .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
        });
    }
    renderPieChart(projects);

    searchInput.addEventListener('change', (event) => {
        let query = event.target.value.toLowerCase();
        let filteredProjects = projects.filter(project =>
            Object.values(project).join(' ').toLowerCase().includes(query)
        );
        
        renderProjects(filteredProjects, projectsContainer, 'h2');
        renderPieChart(filteredProjects)
    });
})();