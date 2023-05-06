<script>
  import Counter from './lib/Counter.svelte'
  import Fab, { Icon } from '@smui/fab';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
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
let recordings = null;
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
  console.log('time:' + time + ', description:' + description)
}
function rd() {

}
 // Contact https://bbcdownload.uk.to/getrecords to get the last 15 recordings with allowed CORS
fetch('https://bbcdownload.uk.to/getrecords').then(res => res.json()).then(res => {
  recordings = res;
});

  console.log(recordings);
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
    <TabBar tabs={['Bloopers', 'Report', 'View Recordings', 'Record', 'Watch' ]} let:tab bind:active>
      <Tab {tab}>
        <Label>{tab}</Label>
      </Tab>
    </TabBar>
   
    {#if active === 'Bloopers'}
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
      <Textfield class="reportText" bind:value={description} label="Description" variant="outlined">
      </Textfield>
    </div>

    <style>
      .reportText {
        padding: 1em;
        width: 100%;
      }
      .reportButton {
        padding: 1em;
      }
    </style>
    {:else if active === 'View Recordings'}
    <div class="card">
      <DataTable class="recordingTables">
        <Head>
          <Row>
            <Cell>Start Time</Cell>
            <Cell>End Time</Cell>
            <Cell>Status</Cell>
            <Cell>Channel</Cell>
            <Cell>View</Cell>
          </Row>
        </Head>
        <Body>
          {#each recordings.rows as recording}
         <Row>
              <Cell>{recording.start_time}</Cell>
              <Cell>{recording.end_time}</Cell>
              <Cell>{recording.status}</Cell>
              <Cell>{recording.channel}</Cell>
              <Button href="https://bbcdownload.uk.to{recording.filename}">View</Button>
            </Row>
          {/each}
        </Body>
      </DataTable>
      </div>
      <style>
        /* Put the button above the datatable and centre them both */
        .recordingButton {
          margin: auto;
          display: block;
        }
        .recordingTables {
          margin-top: 1em;
        }
      </style>
    
    {:else if active === 'Record'}
    <Textfield bind:value={month} label="Month" type="number" />
    <Textfield bind:value={day} label="Day" type="number" />
    <Textfield bind:value={hour} label="Hour" type="number" />
    <Textfield bind:value={minute} label="Minute" type="number" />
    <Textfield bind:value={second} label="Second" type="number" />
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
