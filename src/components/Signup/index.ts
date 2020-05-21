import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Signup extends Vue {
    private username: string = '';
    private password: string = '';
}
