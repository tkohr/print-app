import '../styles/index.scss';
import { downloadBlob, print} from '@camptocamp/inkmap';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

console.log('webpack starterkit');

const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  // display the loading spinner
  btn.working = true;

  const osmSpec = {
    layers: [
        {
        type: 'XYZ',
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
    ],
    size: [800, 600],
    center: [12, 48],
    dpi: 200,
    scale: 40000000,
    scaleBar: { position: 'bottom-right', units: 'metric' },
    projection: 'EPSG:3857',
    northArrow: 'top-right'
  };

  // create a job, get a promise that resolves when the job is finished
  print(osmSpec).then((blob) => {
      // download the result
      const filename = `inkmap-${new Date().toISOString().substr(0, 10)}.png`;
      downloadBlob(blob, filename);

  }, error => {
      console.error(error);
  }
  );
});
