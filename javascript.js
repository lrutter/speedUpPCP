function(el, x, data) {
                      var rects = [];
                      var origPcpDat = data.pcpDat
                      var pcpDat = data.pcpDat
                      
                      var Traces = [];
                      var dLength = pcpDat.length
                      var vLength = data.nVar
                      var cNames = data.colNms
                      for (a=0; a<dLength; a++){
                      xArr = [];
                      yArr = [];
                      for (b=0; b<vLength; b++){
                      xArr.push(b)
                      yArr.push(pcpDat[a][cNames[b]]);
                      }
                      var pcpLine = {
                      x: xArr,
                      y: yArr,
                      mode: 'lines',
                      line: {
                      color: 'red',
                      width: 1
                      },
                      opacity: 0.9,
                      }
                      Traces.push(pcpLine);
                      }
                      Plotly.addTraces(el.id, Traces);
                      
                      var selectTime = 1
                      
                      el.on('plotly_selected', function(e) {
                      if (pcpDat.length>0){
                      
                      var dLength = pcpDat.length
                      var selectedPCP = []
                      var xMin = e.range.x[0]
                      var xMax = e.range.x[1]
                      var xMinC = Math.abs(Math.ceil(xMin))
                      var xMaxF = Math.floor(xMax)
                      var yMin = e.range.y[0]
                      var yMax = e.range.y[1]
                      var integers = []
                      
                      if (!((xMax<0) || (xMin>(vLength-1)))){
                      for (a=xMinC; a<(xMaxF+1); a++){
                      integers.push(a)
                      }
                      }
                      var iLength = integers.length
                      //console.log(['iLength', iLength])
                      
                      var selectedPCP = []
                      var notSelectedPCP = []
                      
                      if (selectTime==1){
                      if (iLength > 0){
                      for (a=0; a<dLength; a++){
                      var dat = pcpDat[a]
                      var isOut = 0;
                      for (b=0; b<iLength; b++){
                      var yVal = dat[cNames[integers[b]]]
                      if (!(yMin < yVal && yVal < yMax)){
                      isOut = 1;
                      }
                      }
                      if (isOut==1){
                      selectedPCP.push(a)
                      }
                      }
                      //console.log(['selectedPCP', selectedPCP])
                      
                      var updateSPCP = []
                      var selectedPCPL = selectedPCP.length
                      for (a=0; a<selectedPCPL; a++){
                      updateSPCP[a]=selectedPCP[a]+1
                      }
                      
                      var update = {
                      line: {
                      color: 'blue',
                      width: 1
                      }
                      }
                      if (selectedPCPL!=0){
                      Plotly.deleteTraces(el.id, updateSPCP);
                      }
                      
                      var newDat = []
                      var selectedPCPL = selectedPCP.length
                      for (a=0; a<dLength; a++){
                      var equal = 0;
                      for (b=0; b<selectedPCPL; b++){
                      if (a==selectedPCP[b]){
                      equal=1
                      }
                      }
                      if (equal==0){
                      newDat.push(pcpDat[a])
                      }
                      }
                      pcpDat = newDat
                      }
                      }
                      
                      if (selectTime>1){
                      if (iLength > 0){
                      for (a=0; a<dLength; a++){
                      var dat = pcpDat[a]
                      var isOut = 0;
                      for (b=0; b<iLength; b++){
                      var yVal = dat[cNames[integers[b]]]
                      if (!(yMin < yVal && yVal < yMax)){
                      isOut = 1;
                      }
                      }
                      
                      if (isOut==0){
                      selectedPCP.push(a)
                      }
                      else{
                      notSelectedPCP.push(a)
                      }
                      }
                      //console.log(['notSelectedPCP', notSelectedPCP])
                      
                      var updateNSPCP = []
                      var notSelectedPCPL = notSelectedPCP.length
                      for (a=0; a<notSelectedPCPL; a++){
                      updateNSPCP[a]=notSelectedPCP[a]+1
                      }
                      //console.log(['updateNSPCP'], updateNSPCP)
                      
                      if (notSelectedPCPL!=0){
                      //console.log(['deleting'], updateNSPCP)
                      Plotly.deleteTraces(el.id, updateNSPCP);
                      }
                      
                      var newDat = []
                      var selectedPCPL = selectedPCP.length
                      for (a=0; a<dLength; a++){
                      var equal = 0;
                      for (b=0; b<selectedPCPL; b++){
                      if (a==selectedPCP[b]){
                      equal=1
                      }
                      }
                      if (equal==1){
                      newDat.push(pcpDat[a])
                      }
                      }
                      pcpDat = newDat
                      }
                      
                      else{
                      for (a=0; a<dLength; a++){
                      notSelectedPCP.push(a)
                      }
                      
                      var updateNSPCP = []
                      var notSelectedPCPL = notSelectedPCP.length
                      for (a=0; a<notSelectedPCPL; a++){
                      updateNSPCP[a]=notSelectedPCP[a]+1
                      }
                      
                      var update = {
                      line: {
                      color: 'red',
                      width: 1
                      }
                      }
                      if (notSelectedPCPL!=0){
                      Plotly.deleteTraces(el.id, update, updateNSPCP);
                      }
                      pcpDat = []
                      }
                      }
                      
                      
                      var drawRect = {
                      type: 'rect',
                      x0: xMin,
                      y0: yMin,
                      x1: xMax,
                      y1: yMax,
                      line: {
                      color: 'gray',
                      width: 1
                      },
                      fillcolor: 'gray',
                      opacity: 0.25
                      }
                      rects.push(drawRect);
                      var update = {
                      shapes:rects
                      }
                      Plotly.relayout(el.id, update)
                      Shiny.onInputChange('rects', rects); // make the rects available to shiny
                      
                      selectTime++
                      }
                      })
                      }