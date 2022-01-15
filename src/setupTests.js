import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

/* Esto se utiliza para simular la funcion
por que el modal no tiene context y no sabe donde redibujarlo */
HTMLCanvasElement.prototype.getContext = () => {};
