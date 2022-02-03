var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   20","line":"const Compiler = @import(\"../compiler.zig\").Compiler;"},
{"lineNum":"   21","line":"const CompileError = @import(\"../errors/compile_error.zig\").CompileError;"},
{"lineNum":"   22","line":"const AssignError = @import(\"../errors/assign_error.zig\").AssignError;"},
{"lineNum":"   23","line":"const OpError = @import(\"../errors/op_error.zig\").OpError;"},
{"lineNum":"   24","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   25","line":"const InferResult = @import(\"infer_result.zig\").InferResult;"},
{"lineNum":"   26","line":"const InferContext = @import(\"infer_context.zig\").InferContext;"},
{"lineNum":"   27","line":"const InferTestCase = @import(\"infer_test_case.zig\").InferTestCase;"},
{"lineNum":"   28","line":"const inferExprType = @import(\"inferrer.zig\").inferExprType;"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"pub fn inferBinaryOpType(","class":"lineCov","hits":"1","order":"4935","possible_hits":"1",},
{"lineNum":"   31","line":"    cmp: *Compiler,"},
{"lineNum":"   32","line":"    nd: node.Node,"},
{"lineNum":"   33","line":"    ctx: *const InferContext,"},
{"lineNum":"   34","line":"    op: node.BinaryOp,"},
{"lineNum":"   35","line":") InferResult {"},
{"lineNum":"   36","line":"    const subCtx = InferContext.none(ctx);","class":"lineCov","hits":"1","order":"4936","possible_hits":"1",},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"    const left = switch (inferExprType(cmp, op.left, &subCtx)) {","class":"linePartCov","hits":"1","order":"4937","possible_hits":"2",},
{"lineNum":"   39","line":"        .Success => |res| res,","class":"lineCov","hits":"1","order":"4943","possible_hits":"1",},
{"lineNum":"   40","line":"        .Error => |err| return InferResult.err(err),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":"    };"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"    const right = switch (inferExprType(cmp, op.right, &subCtx)) {","class":"linePartCov","hits":"1","order":"4944","possible_hits":"2",},
{"lineNum":"   44","line":"        .Success => |res| res,","class":"lineCov","hits":"1","order":"4945","possible_hits":"1",},
{"lineNum":"   45","line":"        .Error => |err| return InferResult.err(err),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   46","line":"    };"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    if (!right.isAssignableTo(left)) {","class":"lineCov","hits":"2","order":"4946","possible_hits":"2",},
{"lineNum":"   49","line":"        return InferResult.err(CompileError.assignError(","class":"lineCov","hits":"1","order":"4959","possible_hits":"1",},
{"lineNum":"   50","line":"            AssignError.new(nd.csr, left, right),","class":"lineCov","hits":"1","order":"4958","possible_hits":"1",},
{"lineNum":"   51","line":"        ));"},
{"lineNum":"   52","line":"    }"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    const entry = cmp.typebook.getOpEntry(op.op);","class":"lineCov","hits":"1","order":"4947","possible_hits":"1",},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"    // We assume it\'s binary, otherwise the Node wouldn\'t have parsed"},
{"lineNum":"   57","line":"    std.debug.assert(entry == null or entry.?.getType() == .Binary);","class":"linePartCov","hits":"1","order":"4948","possible_hits":"2",},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    if (entry == null or !left.isAssignableTo(entry.?.Binary.input)) {","class":"linePartCov","hits":"2","order":"4951","possible_hits":"3",},
{"lineNum":"   60","line":"        return InferResult.err(CompileError.opError(OpError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"            nd.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"            op.op,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"            left,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":"        )));"},
{"lineNum":"   65","line":"    }"},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"    nd.ty = if (entry.?.Binary.output) |out| out else left;","class":"linePartCov","hits":"1","order":"4952","possible_hits":"2",},
{"lineNum":"   68","line":"    return InferResult.success(nd.ty.?);","class":"linePartCov","hits":"1","order":"4953","possible_hits":"2",},
{"lineNum":"   69","line":"}"},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"test \"can infer type of binary op expressions\" {","class":"lineCov","hits":"3","order":"6692","possible_hits":"3",},
{"lineNum":"   72","line":"    const int = node.makeNode(","class":"lineCov","hits":"1","order":"6694","possible_hits":"1",},
{"lineNum":"   73","line":"        std.testing.allocator,"},
{"lineNum":"   74","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"6693","possible_hits":"1",},
{"lineNum":"   75","line":"        .Int,"},
{"lineNum":"   76","line":"        \"3\","},
{"lineNum":"   77","line":"    );"},
{"lineNum":"   78","line":"    defer std.testing.allocator.destroy(int);","class":"linePartCov","hits":"1","order":"6700","possible_hits":"2",},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6699","possible_hits":"2",},
{"lineNum":"   81","line":"        .expectedTy = .Number,"},
{"lineNum":"   82","line":"    }).run(.BinaryOp, node.BinaryOp{","class":"lineCov","hits":"1","order":"6698","possible_hits":"1",},
{"lineNum":"   83","line":"        .op = .Add,","class":"lineCov","hits":"1","order":"6697","possible_hits":"1",},
{"lineNum":"   84","line":"        .left = int,","class":"lineCov","hits":"1","order":"6695","possible_hits":"1",},
{"lineNum":"   85","line":"        .right = int,","class":"lineCov","hits":"1","order":"6696","possible_hits":"1",},
{"lineNum":"   86","line":"    });"},
{"lineNum":"   87","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 18:52:14", "instrumented" : 29, "covered" : 23,};
var merged_data = [];
