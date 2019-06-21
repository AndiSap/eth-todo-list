App = {
  contracts: {},
  loading: false,


  load: async () => {
   // load web3 lib to connect to blockchain
   await App.loadWeb3();
   await App.loadAccount();
   await App.loadContract();
   await App.render();
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    App.account = web3.eth.accounts[0];
  },

  loadContract: async () => {
    // create a JavaScript version of the contract
    const todoList = await $.getJSON('TodoList.json');
    App.contracts.TodoList = TruffleContract(todoList);
    App.contracts.TodoList.setProvider(App.web3Provider);

    App.todoList = await App.contracts.TodoList.deployed();
  },

  render: async () => {
    // prevent double render
    if(App.loading) {
      return;
    }

    // update app loading state
    App.setLoading(true);

    // render account
    $('#account').html(App.account);
    
    // render task
    await App.renderTasks();

    // update app loading state
    App.setLoading(false);
  },

  renderTasks: async () => {
    // Load the total task count from the blockchain
    const taskCount = await App.todoList.taskCount();
    const $taskTemplate = $('.taskTemplate');
  
    // render out each task with a new task template
    for (let i = 1; i <= taskCount; i++) {
      // fetch the task date from the blockchain
      const task = await App.todoList.tasks(i);
      const taskData = {
        id: task[0].toNumber(),
        content: task[1],
        completed: task[2]
      }

      const $newTaskTemplate = $taskTemplate.clone();
      $newTaskTemplate.find('.content').html(taskData.content);
      $newTaskTemplate.find('input')
                      .prop('name', taskData.id)
                      .prop('checked', taskData.completed)
                      .on('click', App.toggleCompleted)

      // put the task in the correct list
      if(taskData.completed) {
        $('#completedTaskList').append($newTaskTemplate);
      } else {
        $('#taskList').append($newTaskTemplate);
      }

      // show the task
      $newTaskTemplate.show();
    }
  },

  setLoading: (boolean) => {
    App.loading = boolean;
    const loader = $('#loader');
    const content = $('#content');
    if(boolean) {
      loader.show();
      content.hide();
    } else {
      loader.hide();
      content.show();
    }
  },

  createTask: async () => {
    App.setLoading(true);
    const content = $('#newTask').val();
    await App.todoList.createTask(content);
    window.location.reload(); // refresh the webpage
  },

  toggleCompleted: async (event) => {
    App.setLoading(true);
    const taskId = event.target.name;
    await App.todoList.toggleCompleted(taskId);
    window.location.reload();
  }
}

$(() => {
  $(window).load(() => {
    App.load();
  })
})