<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import Fab, { Icon } from '@smui/fab';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import Slider from '@smui/slider';
  import FormField from '@smui/form-field';
  import Textfield from '@smui/textfield';

  import Tab from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  // Contact the API to get the items
  let items = ''
  fetch('https://api.bloopertrack.club/get').then(res => res.json()).then(res => {
    items = res;
  });
let open = false;
let time = null;
let description = null;
function a() {
  fetch('https://api.bloopertrack.club/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      time: time,
      description: description
    }
  }).then(() => {
    active = 'List';
  });
  console.log(body)
  console.log('time:' + time + ', description:' + description)
}
let active = 'List';
</script>

<main>
  <div>
    <a href="https://bbc.co.uk" target="_blank" rel="noreferrer">
      <img src=https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/BBC_Logo_2021.svg/1000px-BBC_Logo_2021.svg.png class="logo bbc" alt="BBC Logo" />
    </a>
  </div>
  <h1>Welcome to Bloopertrack</h1>
  <div>
    <TabBar tabs={['List', 'Report', 'Watch']} let:tab bind:active>
      <Tab {tab}>
        <Label>{tab}</Label>
      </Tab>
    </TabBar>
   
    {#if active === 'List'}
    <div class="card">
      <DataTable>
        <Head>
          <Row>
            <Cell>Blooper</Cell>
            <Cell>Time</Cell>
          </Row>
        </Head>
        <Body>
          {#each items as item}
            <Row>
              <Cell>{item.description}</Cell>
              <Cell>{item.time}</Cell>
            </Row>
          {/each}
        </Body>
      </DataTable>
      </div>
    {:else if active === 'Report'}
    <div class="reportText">
      <Textfield
        bind:value={time}
        label="Time(GMT)"
        type="datetime-local"
        variant="outlined"
        class="reportText"
      />
    </div>
    <div class="reportText">
      <Textfield class="reportText" textarea bind:value={description} label="Description" variant="outlined">
      </Textfield>
    </div>
      <Button class="reportButton" on:click={() => a()} variant="raised">
        <Label>Report</Label>
      </Button>
    <style>
      .reportText {
        padding: 1em;
        width: 100%;
      }
      .reportButton {
        padding: 1em;
      }
    </style>
    {:else if active === 'About Us'}

    {/if}

</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.bbc:hover {
    filter: drop-shadow(0 0 2em #b90005);
  }

  .logo.bbc {
    filter:invert()
  }
</style>
