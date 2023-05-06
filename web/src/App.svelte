<script>
  import Counter from './lib/Counter.svelte'
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import Button, { Label } from '@smui/button';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import Icon from '@smui/select/icon';
  import Snackbar, { Actions } from '@smui/snackbar';
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
// Get the current month, day, hour, minute and second
let month = new Date().getMonth();
let day = new Date().getDate();
let hour = new Date().getHours();
let minute = new Date().getMinutes();
let second = new Date().getSeconds();
// Let lhour lminute and lsecond be null
let lhour = null;
let lminute = null;
let lsecond = null;
let channel = null;
let recordChannel;
let snackbar;


const channels = {
  "options": [
    {
      "value": "0",
      "selected": "selected",
      "name": "BBC News Channel"
    },
    {
      "value": "1",
      "name": "BBC One London"
    },
    {
      "value": "2",
      "name": "BBC One Wales"
    },
    {
      "value": "3",
      "name": "BBC One Northern Ireland"
    },
    {
      "value": "4",
      "name": "BBC One Scotland"
    },
    {
      "value": "5",
      "name": "BBC One North West"
    },
    {
      "value": "6",
      "name": "BBC One North East"
    },
    {
      "value": "7",
      "name": "BBC One South West"
    },
    {
      "value": "8",
      "name": "BBC One South East"
    },
    {
      "value": "9",
      "name": "BBC One South"
    },
    {
      "value": "10",
      "name": "BBC One East Yorkshire"
    },
    {
      "value": "11",
      "name": "BBC One Yorks"
    },
    {
      "value": "12",
      "name": "BBC One West Midlands"
    },
    {
      "value": "13",
      "name": "BBC One West"
    },
    {
      "value": "14",
      "name": "BBC One East Midlands"
    },
    {
      "value": "15",
      "name": "BBC One East"
    },
    {
      "value": "16",
      "name": "BBC One Channel Islands"
    },
    {
      "value": "17",
      "name": "BBC Two"
    },
    {
      "value": "18",
      "name": "BBC Three"
    },
    {
      "value": "19",
      "name": "BBC Four"
    },
    {
      "value": "20",
      "name": "CBBC"
    },
    {
      "value": "21",
      "name": "CBeebies"
    },
    {
      "value": "22",
      "name": "BBC Scotland"
    },
    {
      "value": "23",
      "name": "BBC Parliament"
    },
    {
      "value": "24",
      "name": "BBC Alba"
    },
    {
      "value": "25",
      "name": "S4C"
    }
  ]
}

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
function c(month, day, hour, minute, second, lhour, lminute, lsecond, recordChannel) {
console.log(recordChannel + ' is the channel')
  fetch("https://bbcdownload.uk.to/record", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    month: month,
                    day: day,
                    hour: hour,
                    minute: minute,
                    second: second,
                    lhour: lhour,
                    lminute: lminute,
                    lsecond: lsecond,
                    url: recordChannel,
                    by: 'bt.club'
                })
            }).then(response => response.text()).then(response => document.getElementById("snackbarLabel").innerText = response || 'Something went wrong.').then(() => snackbar.open());
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
    <TabBar tabs={['Bloopers', 'Report', 'View Recordings', 'Record', 'Watch UK Feed', 'Watch Europe Feed' ]} let:tab bind:active>
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
    <div class="first">
    <Textfield bind:value={month} label="Month" type="number" />
    <Textfield bind:value={day} label="Day" type="number" />
    <Textfield bind:value={hour} label="Hour" type="number" />
    <Textfield bind:value={minute} label="Minute" type="number" />
    <Textfield bind:value={second} label="Second" type="number" />
     </div>
    <div class="second">
      <h3>Length</h3>
      <Textfield bind:value={lhour} label="Hour" type="number" />
      <Textfield bind:value={lminute} label="Minute" type="number" />
      <Textfield bind:value={lsecond} label="Second" type="number" />
    </div>
    <div class="third">
      <h3>Channel</h3>
      <Select variant="outlined" bind:value={recordChannel} label="Channel">
        <Option value="0">BBC News Channel</Option>
        <Option value="1">BBC One London</Option>
        <Option value="2">BBC One Wales</Option>
        <Option value="3">BBC One Northern Ireland</Option>
        <Option value="4">BBC One Scotland</Option>
        <Option value="5">BBC One North West</Option>
        <Option value="6">BBC One North East</Option>
        <Option value="7">BBC One South West</Option>
        <Option value="8">BBC One South East</Option>
        <Option value="9">BBC One South</Option>
        <Option value="10">BBC One East Yorkshire</Option>
        <Option value="11">BBC One Yorks</Option>
        <Option value="12">BBC One West Midlands</Option>
        <Option value="13">BBC One West</Option>
        <Option value="14">BBC One East Midlands</Option>
        <Option value="15">BBC One East</Option>
        <Option value="16">BBC One Channel Islands</Option>
        <Option value="17">BBC Two</Option>
        <Option value="18">BBC Three</Option>
        <Option value="19">BBC Four</Option>
        <Option value="20">CBBC</Option>
        <Option value="21">CBeebies</Option>
        <Option value="22">BBC Scotland</Option>
        <Option value="23">BBC Parliament</Option>
        <Option value="24">BBC Alba</Option>
        <Option value="25">S4C</Option>
      </Select>
      <pre class="channel">{recordChannel}</pre>
    </div>
    <div class="fourth">
      <Button variant="raised" class="recordingButton" on:click={() => c(month, day, hour, minute, second, lhour, lminute, lsecond, recordChannel)}>Record</Button>
    </div>
    <style>
      /* Give the button a margin */
      .recordingButton {
        margin-top: 1em;
      }
    </style>
    {:else if active === 'Watch UK Feed'}
    <vm-player controls>
      <vm-hls version="latest" poster="/media/poster.png">
        <source data-src="https://origin-fra01-ed.pzaz.tv/live/bbc-news-hd/playlist.m3u8" type="application/x-mpegURL" />
      </vm-hls>
    </vm-player>
    {:else if active === 'Watch Europe Feed'}
    <vm-player controls>
      <vm-hls version="latest" poster="/media/poster.png">
        <source data-src="https://origin-fra01-ed.pzaz.tv/live/bbc-world-europe/playlist.m3u8" type="application/x-mpegURL" />
      </vm-hls>
    </vm-player>
    {/if}

    <Snackbar leading bind:this={snackbar}>
      <Label id="snackbarLabel"></Label>
      <Actions>
        <Button>Close</Button>
      </Actions>
    </Snackbar>
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
